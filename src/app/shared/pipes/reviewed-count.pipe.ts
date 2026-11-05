import { inject, Pipe, PipeTransform } from '@angular/core';
import { Episode } from '../../core/models/episode.model';
import { EpisodeService } from '../../core/services/episode.service';

@Pipe({ name: 'reviewedCount', standalone: true })
export class ReviewedCountPipe implements PipeTransform {
  private readonly _episodeService = inject(EpisodeService);

  transform(episodes: Episode[]): number {
    return episodes.filter((episode) => this._episodeService.isReviewed(episode.id)).length;
  }
}
