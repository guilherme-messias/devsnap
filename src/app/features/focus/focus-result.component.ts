import { DecimalPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FocusSessionService } from '../../core/services/focus-session.service';

@Component({
  selector: 'app-focus-result',
  standalone: true,
  templateUrl: './focus-result.component.html',
  styleUrl: './focus-result.component.scss',
  imports: [DecimalPipe, MatButtonModule, MatIconModule],
})
export class FocusResultComponent {
  private readonly _focusSessionService = inject(FocusSessionService);
  private readonly _router = inject(Router);

  readonly session = toSignal(this._focusSessionService.session$, { initialValue: null });

  readonly reviewedCount = computed(() => this.session()?.reviewed.length ?? 0);
  readonly totalCount = computed(() => this.session()?.episodes.length ?? 0);
  readonly progressPercent = computed(() => {
    const total = this.totalCount();
    if (total === 0) return 0;
    return (this.reviewedCount() / total) * 100;
  });

  isReviewedInSession(episodeId: string): boolean {
    return this.session()?.reviewed.includes(episodeId) ?? false;
  }

  startNewFocusSession(): void {
    void this._router.navigate(['/foco']);
  }

  goToFocusConfig(): void {
    void this._router.navigate(['/foco']);
  }

  goToStack(): void {
    const stackId = this.session()?.episodes[0]?.stackId;
    if (!stackId) return;
    void this._router.navigate(['/stacks', stackId]);
  }

  goToHome(): void {
    void this._router.navigate(['/home']);
  }
}
