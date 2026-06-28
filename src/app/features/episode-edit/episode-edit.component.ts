import { Component, inject, signal } from '@angular/core';
import { EpisodeService } from '../../core/services/episode.service';
import { ActivatedRoute } from '@angular/router';
import { Episode } from '../../core/models/episode.model';
import { EpisodeFormComponent } from '../episode-form/episode-form.component';

@Component({
  selector: 'app-episode-edit',
  standalone: true,
  templateUrl: './episode-edit.component.html',
  imports: [EpisodeFormComponent],
})
export class EpisodeEditComponent {
  private readonly _route = inject(ActivatedRoute);
  private readonly _episodeService = inject(EpisodeService);

  readonly episode = signal<Episode | undefined>(undefined);

  ngOnInit(): void {
    const episodeId = this._route.snapshot.paramMap.get('id');
    if (episodeId) {
      this.episode.set(this._episodeService.getById(episodeId));
    }
  }
}
