import { isPlatformBrowser } from '@angular/common';
import { Component, effect, inject, PLATFORM_ID } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { FocusSessionService } from '../../core/services/focus-session.service';
import { EpisodeDetailComponent } from '../episode-detail/episode-detail.component';

@Component({
  selector: 'app-focus-session',
  standalone: true,
  templateUrl: './focus-session.component.html',
  imports: [EpisodeDetailComponent],
})
export class FocusSessionComponent {
  private readonly _focusSessionService = inject(FocusSessionService);
  private readonly _router = inject(Router);
  private readonly _platformId = inject(PLATFORM_ID);

  readonly currentEpisode = toSignal(this._focusSessionService.currentEpisode$, {
    initialValue: null,
  });
  readonly session = toSignal(this._focusSessionService.session$, { initialValue: null });

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
    this._focusSessionService.end();
  }

  markReviewedAndNext(): void {
    this._focusSessionService.markCurrentReviewed();
    this._focusSessionService.next();
  }

  skipToNext(): void {
    this._focusSessionService.next();
  }
}
