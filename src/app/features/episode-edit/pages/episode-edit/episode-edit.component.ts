import { Component, computed, inject, input } from '@angular/core';
import { EpisodeApiService } from '@app/core/services/episode-api.service';
import { EpisodeFormComponent } from '@app/shared/components/episode-form.component';

@Component({
  selector: 'app-episode-edit',
  standalone: true,
  templateUrl: './episode-edit.component.html',
  imports: [EpisodeFormComponent],
})
export class EpisodeEditComponent {
  private readonly _episodeApiService = inject(EpisodeApiService);

  readonly eid = input.required<string>();

  readonly episode = computed(() => {
    const id = this.eid();
    return this._episodeApiService.getEpisodeById(id);
  });
}
