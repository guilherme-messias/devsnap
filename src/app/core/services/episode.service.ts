import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Episode } from '../models/episode.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class EpisodeService {
  private readonly _platformId = inject(PLATFORM_ID);
  private _episodes = signal<Episode[]>(this._load());
  readonly episodes = this._episodes.asReadonly();

  readonly pending = computed(() => this._episodes().filter((e) => !e.reviewedAt));
  readonly pendingByStack = computed(() =>
    this._episodes()
      .filter((e) => !e.reviewedAt)
      .reduce(
        (acc, e) => {
          acc[e.stackId] = (acc[e.stackId] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      ),
  );

  private _load(): Episode[] {
    if (!isPlatformBrowser(this._platformId)) {
      return [];
    }
    const raw = localStorage.getItem('devsnap:episodes');
    return raw ? JSON.parse(raw) : [];
  }

  private _persist() {
    localStorage.setItem('devsnap:episodes', JSON.stringify(this._episodes()));
  }

  add(episode: Episode): void {
    this._episodes.update((episodes) => [...episodes, episode]);
    this._persist();
  }

  remove(episode: Episode): void {
    this._episodes.update((episodes) => episodes.filter((e) => e.id !== episode.id));
    this._persist();
  }

  update(episode: Episode, changes: Partial<Episode>): void {
    this._episodes.update((episodes) =>
      episodes.map((e) => (e.id === episode.id ? { ...e, ...changes } : e)),
    );
    this._persist();
  }
  markReviewed(id: string): void {
    this._episodes.update((episodes) =>
      episodes.map((e) => (e.id === id ? { ...e, reviewedAt: new Date() } : e)),
    );
    this._persist();
  }

  getByStack(stackId: string): Episode[] {
    return computed(() => this._episodes().filter((e) => e.stackId === stackId))?.();
  }

  getById(id: string): Episode | undefined {
    return computed(() => this._episodes().find((e) => e.id === id))?.();
  }
}
