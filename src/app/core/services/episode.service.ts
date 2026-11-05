import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Episode } from '../models/episode.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class EpisodeService {
  private readonly _platformId = inject(PLATFORM_ID);
  private _episodes = signal<Episode[]>(this._load());
  private readonly _reviewedEpisodeIds = signal<ReadonlySet<string>>(this._loadReviewedEpisodeIds());
  readonly episodes = this._episodes.asReadonly();

  readonly pending = computed(() => this._episodes().filter((e) => !this.isReviewed(e.id)));
  readonly pendingByStack = computed(() =>
    this._episodes()
      .filter((e) => !this.isReviewed(e.id))
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

  private _loadReviewedEpisodeIds(): ReadonlySet<string> {
    if (!isPlatformBrowser(this._platformId)) {
      return new Set();
    }

    const episodeData = localStorage.getItem('devsnap:episodes');
    const legacyEpisodes: unknown = episodeData ? JSON.parse(episodeData) : [];
    const reviewedIds = new Set<string>();

    if (Array.isArray(legacyEpisodes)) {
      for (const candidate of legacyEpisodes) {
        if (typeof candidate !== 'object' || candidate === null) continue;
        const episode = candidate as Record<string, unknown>;
        if (typeof episode['id'] === 'string' && episode['reviewedAt']) {
          reviewedIds.add(episode['id']);
        }
      }
    }

    const raw = localStorage.getItem('devsnap:reviewed-episodes');
    const storedIds: unknown = raw ? JSON.parse(raw) : [];
    if (Array.isArray(storedIds)) {
      for (const id of storedIds) {
        if (typeof id === 'string') {
          reviewedIds.add(id);
        }
      }
    }
    return reviewedIds;
  }

  private _persist() {
    localStorage.setItem('devsnap:episodes', JSON.stringify(this._episodes()));
  }

  private _persistReviewedEpisodeIds(): void {
    localStorage.setItem(
      'devsnap:reviewed-episodes',
      JSON.stringify([...this._reviewedEpisodeIds()]),
    );
  }

  isReviewed(id: string): boolean {
    return this._reviewedEpisodeIds().has(id);
  }

  add(episode: Episode): void {
    this._episodes.update((episodes) => [...episodes, episode]);
    this._persist();
  }

  remove(episode: Episode): void {
    this._episodes.update((episodes) => episodes.filter((e) => e.id !== episode.id));
    this._reviewedEpisodeIds.update((ids) => {
      const updatedIds = new Set(ids);
      updatedIds.delete(episode.id);
      return updatedIds;
    });
    this._persist();
    this._persistReviewedEpisodeIds();
  }

  reset(): void {
    this._episodes.set([]);
    this._reviewedEpisodeIds.set(new Set());
  }

  removeAll(): void {
    this.reset();
    this._persist();
    this._persistReviewedEpisodeIds();
  }

  update(episode: Episode, changes: Partial<Episode>): void {
    this._episodes.update((episodes) =>
      episodes.map((e) => (e.id === episode.id ? { ...e, ...changes } : e)),
    );
    this._persist();
  }
  markReviewed(id: string): void {
    this._reviewedEpisodeIds.update((ids) => new Set(ids).add(id));
    this._episodes.update((episodes) => [...episodes]);
    this._persistReviewedEpisodeIds();
  }

  getByStack(stackId: string): Episode[] {
    return computed(() => this._episodes().filter((e) => e.stackId === stackId))?.();
  }

  getById(id: string): Episode | undefined {
    return computed(() => this._episodes().find((e) => e.id === id))?.();
  }

  removeByStack(stackId: string): void {
    const removedIds = new Set(
      this._episodes()
        .filter((episode) => episode.stackId === stackId)
        .map((episode) => episode.id),
    );
    this._episodes.update((episodes) => episodes.filter((e) => e.stackId !== stackId));
    this._reviewedEpisodeIds.update((ids) => new Set([...ids].filter((id) => !removedIds.has(id))));
    this._persist();
    this._persistReviewedEpisodeIds();
  }
}
