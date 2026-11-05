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
import { EpisodeApiService } from '@app/core/services/episode-api.service';
import { EpisodeDetailResponse } from '@app/core/models/episode-detail-response.model';
import { EpisodeListResponse } from '@app/core/models/episode-list-response.model';

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
  private readonly _episodeApiService = inject(EpisodeApiService);
  private readonly _dialog = inject(MatDialog);
  private readonly _router = inject(Router);

  readonly episode = signal<EpisodeDetailResponse | null>(null);
  readonly episodes = signal<EpisodeListResponse | null>(null);
  readonly solutionRevealed = signal(false);
  readonly focusMode = input<boolean>(false);

  readonly eid = input.required<string>();

  ngOnInit() {
    const id = this.eid();
    this._episodeApiService.getEpisodeById(id).subscribe({
      next: (episode) => this.episode.set(episode),
      error: () => this._router.navigate(['/']),
    });
  }

  readonly isReviewed = computed(() => {
    const episode = this.episode();
    return episode ? this._episodeService.isReviewed(episode.episode.id) : false;
  });

  revealSolution(): void {
    this.solutionRevealed.set(true);
  }

  markAsReviewed(): void {
    const id = this.episode()?.episode.id;
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

        this._episodeApiService.deleteEpisode(episode.episode.id).subscribe({
          next: () => {
            this._router.navigate(['/stacks', episode.episode.stackId]);
          },
        });
      }
    });
  }

  goToNextPendingEpisode(): void {
    this._episodeApiService.getEpisodes().subscribe({
      next: (episodes) => {
        this.episodes.set(episodes);
      },
    });

    const episodeByStack =
      this.episodes()?.episodes.filter((e) => e.stackId === this.episode()?.episode.stackId) ?? [];

    const nextEpisode = episodeByStack
      .filter((e) => !this._episodeService.isReviewed(e.id) && e.id !== this.episode()?.episode.id)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .at(0);

    if (!nextEpisode) return;

    this._router.navigate(['/stacks', nextEpisode.stackId, 'episodios', nextEpisode.id]);
  }
}
