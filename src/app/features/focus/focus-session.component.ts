import { Component, inject } from '@angular/core';
import { FocusSessionService } from '../../core/services/focus-session.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-focus-session',
  standalone: true,
  templateUrl: './focus-session.component.html',
})
export class FocusSessionComponent {
  private readonly _focusSessionService = inject(FocusSessionService);

  readonly currentEpisode = toSignal(this._focusSessionService.currentEpisode$, {
    initialValue: null,
  });
}
