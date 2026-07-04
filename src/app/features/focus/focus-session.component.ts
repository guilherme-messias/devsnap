import { isPlatformBrowser } from '@angular/common';
import { Component, computed, effect, inject, PLATFORM_ID } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FocusSessionService } from '../../core/services/focus-session.service';
import { EpisodeDetailComponent } from '../episode-detail/episode-detail.component';
import { EpisodeService } from '../../core/services/episode.service';

@Component({
  selector: 'app-focus-session',
  standalone: true,
  templateUrl: './focus-session.component.html',
  styleUrl: './focus-session.component.scss',
  imports: [EpisodeDetailComponent, MatButtonModule, MatIconModule],
})
export class FocusSessionComponent {
  private readonly _focusSessionService = inject(FocusSessionService);
  private readonly _episodeService = inject(EpisodeService);
  private readonly _router = inject(Router);
  private readonly _platformId = inject(PLATFORM_ID);

  readonly currentEpisode = toSignal(this._focusSessionService.currentEpisode$, {
    initialValue: null,
  });
  readonly session = toSignal(this._focusSessionService.session$, { initialValue: null });

  readonly progressCurrent = computed(() => (this.session()?.currentIndex ?? 0) + 1);
  readonly progressTotal = computed(() => this.session()?.episodes?.length ?? 0);
  readonly progressPercent = computed(() => {
    const total = this.progressTotal();
    if (total === 0) return 0;
    return (this.progressCurrent() / total) * 100;
  });

  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this._platformId)) return;

      this.session();

      if (!this._focusSessionService.isActive()) {
        void this._router.navigate(['/foco/resultado']);
      }
    });
  }

  endFocusSession(): void {
    this._router.navigate(['/foco/resultado']);
  }

  markReviewedAndNext(): void {
    const id = this.currentEpisode()?.id;
    if (!id) return;
    this._episodeService.markReviewed(id);
    this._focusSessionService.markCurrentReviewed();
    this._focusSessionService.next();
  }

  skipToNext(): void {
    this._focusSessionService.next();
  }
}
