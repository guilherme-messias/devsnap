import { Component, inject, signal, input, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EpisodeService } from '../../core/services/episode.service';
import { CodeSnippetComponent } from '../../shared/components/code-snippet.component';
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { StackService } from '../../core/services/stack.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AnnotationListComponent } from './annotation-list.component';
import { AnnotationFormComponent } from './annotation-form.component';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  templateUrl: './episode-detail.component.html',
  styleUrl: './episode-detail.component.scss',
  imports: [
    CodeSnippetComponent,
    MatChipsModule,
    DatePipe,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    AnnotationListComponent,
    AnnotationFormComponent,
  ],
})
export class EpisodeDetailComponent {
  private readonly _episodeService = inject(EpisodeService);
  private readonly _stackService = inject(StackService);
  private readonly _dialog = inject(MatDialog);
  private readonly _router = inject(Router);

  readonly solutionRevealed = signal(false);
  readonly focusMode = input<boolean>(false);

  readonly eid = input.required<string>();

  readonly episode = computed(() => {
    const id = this.eid();
    return this._episodeService.episodes().find((e) => e.id === id);
  });

  revealSolution(): void {
    this.solutionRevealed.set(true);
  }

  getStackName(stackId: string): string {
    return this._stackService.getById(stackId)?.name ?? '';
  }

  markAsReviewed(): void {
    this._episodeService.markReviewed(this.episode()?.id ?? '');
  }

  deleteEpisode(): void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Excluir episódio',
        message: 'Tem certeza que deseja excluir este episódio?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const episode = this.episode();
        if (!episode) return;

        this._episodeService.remove(episode);
        this._router.navigate(['/stacks', episode.stackId]);
      }
    });
  }

  goToNextPendingEpisode(): void {
    const nextEpisode = this._episodeService
      .getByStack(this.episode()?.stackId ?? '')
      .filter((e) => !e.reviewedAt && e.id !== this.episode()?.id)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .at(0);

    if (!nextEpisode) return;

    this._router.navigate(['/stacks', nextEpisode.stackId, 'episodios', nextEpisode.id]);
  }
}
