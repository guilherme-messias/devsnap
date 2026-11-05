import { DatePipe } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { EpisodeService } from '@app/core/services/episode.service';
import { ConfirmDialogComponent } from '@app/shared/components/confirm-dialog.component';
import { AnnotationFormComponent } from '../../components/annotation-form/annotation-form.component';
import { AnnotationListComponent } from '../../components/annotation-list/annotation-list.component';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  templateUrl: './episode-detail.component.html',
  styleUrl: './episode-detail.component.scss',
  imports: [
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
  private readonly _dialog = inject(MatDialog);
  private readonly _router = inject(Router);

  readonly solutionRevealed = signal(false);
  readonly focusMode = input<boolean>(false);

  readonly eid = input.required<string>();

  readonly episode = computed(() => {
    const id = this.eid();
    return this._episodeService.episodes().find((e) => e.id === id);
  });
  readonly isReviewed = computed(() => {
    const episode = this.episode();
    return episode ? this._episodeService.isReviewed(episode.id) : false;
  });

  revealSolution(): void {
    this.solutionRevealed.set(true);
  }

  markAsReviewed(): void {
    const id = this.episode()?.id;
    if (id) {
      this._episodeService.markReviewed(id);
    }
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
      .filter((e) => !this._episodeService.isReviewed(e.id) && e.id !== this.episode()?.id)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .at(0);

    if (!nextEpisode) return;

    this._router.navigate(['/stacks', nextEpisode.stackId, 'episodios', nextEpisode.id]);
  }
}
