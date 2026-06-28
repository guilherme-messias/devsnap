import { Component, computed, inject } from '@angular/core';
import { FocusSessionService } from '../../core/services/focus-session.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProgressBarComponent } from '../../shared/components/progress-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-focus-result',
  standalone: true,
  templateUrl: './focus-result.component.html',
  imports: [ProgressBarComponent, MatIconModule],
})
export class FocusResultComponent {
  private readonly _focusSessionService = inject(FocusSessionService);
  readonly session = toSignal(this._focusSessionService.session$, { initialValue: null });
  private readonly _router = inject(Router);

  readonly reviewedCount = computed(() => this.session()?.reviewed.length ?? 0);
  readonly totalCount = computed(() => this.session()?.episodes.length ?? 0);
  readonly progressPercent = computed(() => {
    const total = this.totalCount();
    if (total === 0) return 0;
    return (this.reviewedCount() / total) * 100;
  });

  startNewFocusSession(): void {
    this._focusSessionService.start([]);
    void this._router.navigate(['/foco/sessao']);
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
