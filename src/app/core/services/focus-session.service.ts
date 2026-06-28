import { Injectable } from '@angular/core';
import { Episode } from '../models/episode.model';
import { BehaviorSubject, map, Observable } from 'rxjs';

interface FocusSession {
  episodes: Episode[];
  currentIndex: number;
  startedAt: Date;
  reviewed: string[];
}

function fisherYatesShuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

@Injectable({ providedIn: 'root' })
export class FocusSessionService {
  private _session$ = new BehaviorSubject<FocusSession | null>(null);
  readonly session$ = this._session$.asObservable();

  get currentEpisode$(): Observable<Episode | null> {
    return this.session$.pipe(
      map((session) => (session ? session.episodes[session.currentIndex] : null)),
    );
  }

  get snapshot(): FocusSession | null {
    return this._session$.value;
  }

  isActive(): boolean {
    const session = this._session$.value;
    return !!session && session.currentIndex < session.episodes.length;
  }

  start(episodes: Episode[]): void {
    if (episodes.length === 0) return;

    const shuffled = fisherYatesShuffle(episodes);
    this._session$.next({
      episodes: shuffled,
      currentIndex: 0,
      startedAt: new Date(),
      reviewed: [],
    });
  }

  next(): void {
    const session = this._session$.value;
    if (!session) return;

    this._session$.next({ ...session, currentIndex: session.currentIndex + 1 });
  }

  markCurrentReviewed(): void {
    const session = this._session$.value;
    if (!session) return;

    const currentId = session.episodes[session.currentIndex].id;
    this._session$.next({ ...session, reviewed: [...session.reviewed, currentId] });
  }

  end(): void {
    this._session$.next(null);
  }
}
