import { Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { EpisodeDetailResponse } from '@app/core/models/episode-detail-response.model';
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
  private readonly _router = inject(Router);
  readonly episode = signal<EpisodeDetailResponse | null>(null);

  readonly eid = input.required<string>();

  ngOnInit() {
    const id = this.eid();
    this._episodeApiService.getEpisodeById(id).subscribe({
      next: (episode) => this.episode.set(episode),
      error: () => this._router.navigate(['/']),
    });
  }

  readonly episodeData = computed(() => {
    return this.episode();
  });
}
