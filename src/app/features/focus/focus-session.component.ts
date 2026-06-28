import { Component, inject } from '@angular/core';
import { FocusSessionService } from '../../core/services/focus-session.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-focus-session',
  standalone: true,
  templateUrl: './focus-session.component.html',
})
export class FocusSessionComponent {
  private readonly _focusSessionService = inject(FocusSessionService);
  private readonly _router = inject(Router);

  readonly currentEpisode = toSignal(this._focusSessionService.currentEpisode$, {
    initialValue: null,
  });
  readonly session = toSignal(this._focusSessionService.session$, { initialValue: null });

  endFocusSession(): void {
    this._focusSessionService.end();
    this._router.navigate(['/foco/resultado']);
  }
}
