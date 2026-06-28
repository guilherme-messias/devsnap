import { Component, inject, OnInit } from '@angular/core';
import { FocusSessionService } from '../../core/services/focus-session.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { EpisodeDetailComponent } from '../episode-detail/episode-detail.component';

@Component({
  selector: 'app-focus-session',
  standalone: true,
  templateUrl: './focus-session.component.html',
  imports: [EpisodeDetailComponent],
})
export class FocusSessionComponent implements OnInit {
  private readonly _focusSessionService = inject(FocusSessionService);
  private readonly _router = inject(Router);

  readonly currentEpisode = toSignal(this._focusSessionService.currentEpisode$, {
    initialValue: null,
  });
  readonly session = toSignal(this._focusSessionService.session$, { initialValue: null });

  ngOnInit() {
    this._focusSessionService.session$.subscribe((session) => {
      if (!session || session.currentIndex >= (session.episodes?.length ?? 0)) {
        this._router.navigate(['/foco/resultado']);
        return;
      }
    });
  }

  endFocusSession(): void {
    this._focusSessionService.end();
    this._router.navigate(['/foco/resultado']);
  }
}
