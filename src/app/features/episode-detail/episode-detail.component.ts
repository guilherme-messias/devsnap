import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EpisodeService } from '../../core/services/episode.service';
import { Episode } from '../../core/models/episode.model';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  templateUrl: './episode-detail.component.html',
})
export class EpisodeDetailComponent implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _episodeService = inject(EpisodeService);

  readonly episode = signal<Episode | undefined>(undefined);
  readonly solutionRevealed = signal(false);

  ngOnInit(): void {
    const episodeId = this._route.snapshot.paramMap.get('eid');
    if (episodeId) {
      this.episode.set(this._episodeService.getById(episodeId));
    }
  }

  revealSolution(): void {
    this.solutionRevealed.set(true);
  }
}
