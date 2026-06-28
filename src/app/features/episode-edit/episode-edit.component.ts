import { Component, computed, inject, signal } from '@angular/core';
import { EpisodeService } from '../../core/services/episode.service';
import { StackService } from '../../core/services/stack.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Episode } from '../../core/models/episode.model';

@Component({
  selector: 'app-episode-edit',
  standalone: true,
  templateUrl: './episode-edit.component.html',
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
