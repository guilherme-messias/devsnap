import { Pipe, PipeTransform } from '@angular/core';
import { Episode } from '../../core/models/episode.model';

@Pipe({ name: 'urgencyLevel', standalone: true })
export class UrgencyLevelPipe implements PipeTransform {
  transform(episodes: Episode[]): 'urgent' | 'moderate' | 'ok' {
    const pendingCount = episodes.filter(
      (e) =>
        new Date(e.createdAt) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && !e.reviewedAt,
    ).length;
    if (pendingCount === 0) return 'ok' as const;
    if (pendingCount <= 7) {
      return 'moderate' as const;
    }
    return 'urgent' as const;
  }
}
