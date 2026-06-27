import { Pipe, PipeTransform } from '@angular/core';
import { Episode } from '../../core/models/episode.model';

type UrgencyLevel = 'urgent' | 'moderate' | 'ok';

@Pipe({ name: 'urgencyLevel', standalone: true })
export class UrgencyLevelPipe implements PipeTransform {
  transform(value: Episode | Episode[] | null | undefined): UrgencyLevel {
    const episodes = this._toEpisodes(value);
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    const pendingCount = episodes.filter(
      (e) => !e.reviewedAt && new Date(e.createdAt).getTime() < weekAgo,
    ).length;

    if (pendingCount === 0) return 'ok';
    if (pendingCount <= 7) return 'moderate';
    return 'urgent';
  }

  private _toEpisodes(value: Episode | Episode[] | null | undefined): Episode[] {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }
}