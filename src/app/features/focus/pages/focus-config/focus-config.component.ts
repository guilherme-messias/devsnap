import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { EpisodeService } from '@app/core/services/episode.service';
import { FocusSessionService } from '@app/core/services/focus-session.service';
import { StackService } from '@app/core/services/stack.service';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-focus-config',
  standalone: true,
  templateUrl: 'focus-config.component.html',
  styleUrl: './focus-config.component.scss',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class FocusConfigComponent {
  private readonly _stackService: StackService = inject(StackService);
  private readonly _episodeService: EpisodeService = inject(EpisodeService);
  private readonly _focusSessionService = inject(FocusSessionService);
  private readonly _router = inject(Router);

  readonly stacks = this._stackService.stacks;
  readonly form = new FormGroup({
    stackId: new FormControl<string | null>(null, Validators.required),
  });
  readonly selectedStackId = toSignal(
    this.form.controls.stackId.valueChanges.pipe(startWith(this.form.controls.stackId.value)),
    { initialValue: this.form.controls.stackId.value },
  );

  readonly availablePending = computed(() => {
    const stackId = this.selectedStackId();
    if (!stackId) return [];
    return this._episodeService.getByStack(stackId).filter((e) => !e.reviewedAt);
  });

  focusSessionStart(): void {
    const episodes = this.availablePending();
    if (episodes.length === 0) return;

    this._focusSessionService.start(episodes);
    void this._router.navigate(['/foco/sessao']);
  }
}
