import { Component, inject } from '@angular/core';
import { EpisodeService } from '../../core/services/episode.service';
import { StackService } from '../../core/services/stack.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-focus-config',
  standalone: true,
  templateUrl: 'focus-config.component.html',
  imports: [MatSelectModule],
})
export class FocusConfigComponent {
  private readonly _stackService: StackService = inject(StackService);
  private readonly _episodeService: EpisodeService = inject(EpisodeService);

  readonly stacks = this._stackService.stacks;
}
