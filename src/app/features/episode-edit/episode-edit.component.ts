import { Component, computed, inject, input } from '@angular/core';
import { EpisodeService } from '../../core/services/episode.service';
import { EpisodeFormComponent } from '../episode-form/episode-form.component';

@Component({
  selector: 'app-episode-edit',
  standalone: true,
  templateUrl: './episode-edit.component.html',
  imports: [EpisodeFormComponent],
})
export class EpisodeEditComponent {
  private readonly _episodeService = inject(EpisodeService);

  readonly eid = input.required<string>();

  readonly episode = computed(() => {
    const id = this.eid();
    return this._episodeService.episodes().find((e) => e.id === id);
  });
}
