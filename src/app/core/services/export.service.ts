import { Injectable } from '@angular/core';
import { Episode } from '../models/episode.model';
import { Stack } from '../models/stack.model';
import { saveAs } from 'file-saver';

@Injectable({ providedIn: 'root' })
export class ExportService {
  buildMarkdown(stack: Stack, episodes: Episode[]): string {
    return `# ${stack.name}

    ${episodes
      .map(
        (e) => `## ${e.title}

    ${e.error}

    ${e.solution}
    `,
      )
      .join('\n')}
    `;
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
