import { Injectable } from '@angular/core';
import { Episode } from '../models/episode.model';
import { Stack } from '../models/stack.model';
import { saveAs } from 'file-saver';

@Injectable({ providedIn: 'root' })
export class ExportService {
  buildMarkdown(stack: Stack, episodes: Episode[]): string {
    const sorted = [...episodes].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

    const header = this.buildStackHeader(stack, sorted.length);
    const body =
      sorted.length === 0
        ? '_Nenhum episódio registrado nesta stack._'
        : sorted
            .map((episode, index) => this.buildEpisodeSection(episode, index))
            .join('\n\n---\n\n');

    return `${header}\n\n---\n\n${body}\n`;
  }

  private buildStackHeader(stack: Stack, episodeCount: number): string {
    const exportDate = new Date().toLocaleDateString('pt-BR');
    const episodeLabel = episodeCount === 1 ? '1 episódio' : `${episodeCount} episódios`;

    return `# ${stack.name}\n\n> Exportado em ${exportDate} · ${episodeLabel}`;
  }

  private buildEpisodeSection(episode: Episode, index: number): string {
    const parts: string[] = [`## ${index + 1}. ${episode.title}`, this.buildEpisodeMeta(episode)];

    this.appendSection(parts, 'Erro encontrado', episode.error);
    this.appendSection(parts, 'O que tentou', episode.attempts);
    this.appendSection(parts, 'Solução', episode.solution);
    this.appendSection(parts, 'Por que funcionou', episode.reasoning);

    if (episode.snippets?.trim()) {
      parts.push(`### Código relevante\n\n\`\`\`\n${episode.snippets.trim()}\n\`\`\``);
    }

    if (episode.annotations?.length) {
      const items = episode.annotations
        .map((annotation) => `- ${annotation.text} _(${this.formatDate(annotation.createdAt)})_`)
        .join('\n');
      parts.push(`### Anotações\n\n${items}`);
    }

    return parts.join('\n\n');
  }

  private buildEpisodeMeta(episode: Episode): string {
    const meta = [`**Data:** ${this.formatDate(episode.createdAt)}`];

    if (episode.reviewedAt) {
      meta.push(`**Revisado:** ${this.formatDate(episode.reviewedAt)}`);
    }

    if (episode.tags?.length) {
      meta.push(`**Tags:** ${episode.tags.join(', ')}`);
    }

    return meta.join(' · ');
  }

  private appendSection(parts: string[], heading: string, content: string): void {
    const trimmed = content?.trim();
    if (trimmed) {
      parts.push(`### ${heading}\n\n${trimmed}`);
    }
  }

  private formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  exportStack(stack: Stack, episodes: Episode[]): void {
    const markdown = this.buildMarkdown(stack, episodes);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    saveAs(blob, `${stack.name}.md`);
  }

  exportMultiple(stacks: Stack[], allEpisodes: Episode[]): void {
    stacks.forEach((stack) => {
      const episodes = allEpisodes.filter((e) => e.stackId === stack.id);
      this.exportStack(stack, episodes);
    });
  }
}
