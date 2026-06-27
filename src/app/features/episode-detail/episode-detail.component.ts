import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EpisodeService } from '../../core/services/episode.service';
import { Episode } from '../../core/models/episode.model';
import { CodeSnippetComponent } from '../../shared/components/code-snippet.component';
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { StackService } from '../../core/services/stack.service';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  templateUrl: './episode-detail.component.html',
  imports: [CodeSnippetComponent, MatChipsModule, DatePipe, RouterLink, MatIconModule],
})
export class EpisodeDetailComponent implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _episodeService = inject(EpisodeService);
  private readonly _stackService = inject(StackService);
  private readonly _dialog = inject(MatDialog);
  private readonly _router = inject(Router);

  readonly episode = signal<Episode | undefined>(undefined);
  readonly solutionRevealed = signal(false);

  ngOnInit(): void {
    const episodeId = this._route.snapshot.paramMap.get('eid');
    if (episodeId) {
      this.episode.set(this._episodeService.getById(episodeId));
    }
  }

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
        this._episodeService.remove(this.episode());
        this._router.navigate(['/stacks', this.episode()?.stackId]);
      }
    });
  }

  goToNextPendingEpisode(): void {
    const nextEpisode = this._episodeService
      .getByStack(this.episode()?.stackId ?? '')
      ?.find((e) => !e.reviewedAt);
    if (nextEpisode) {
      this._router.navigate(['/stacks', nextEpisode.stackId, 'episodios', nextEpisode.id]);
    }
  }
}
