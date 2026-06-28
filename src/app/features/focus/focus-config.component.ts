import { Component, computed, inject } from '@angular/core';
import { EpisodeService } from '../../core/services/episode.service';
import { StackService } from '../../core/services/stack.service';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-focus-config',
  standalone: true,
  templateUrl: 'focus-config.component.html',
  imports: [MatSelectModule, ReactiveFormsModule],
})
export class FocusConfigComponent {
  private readonly _stackService: StackService = inject(StackService);
  private readonly _episodeService: EpisodeService = inject(EpisodeService);

  readonly stacks = this._stackService.stacks;
  readonly form = new FormGroup({
    stackId: new FormControl<string | null>(null),
  });

  readonly availablePending = computed(() => {
    const stackId = this.form.get('stackId')?.value;
    if (!stackId) return [];
    return this._episodeService.getByStack(stackId).filter((e) => !e.reviewedAt);
  });
}
