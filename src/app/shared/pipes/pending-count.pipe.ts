import { Pipe, PipeTransform } from '@angular/core';
import { Episode } from '../../core/models/episode.model';

@Pipe({ name: 'pendingCount', standalone: true })
export class PendingCountPipe implements PipeTransform {
  transform(episodes: Episode[]): number {
    return episodes.filter((e) => !e.reviewedAt).length;
  }
}
