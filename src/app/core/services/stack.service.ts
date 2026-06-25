import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Stack } from '../models/stack.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class StackService {
  private readonly _platformId = inject(PLATFORM_ID);
  private _stacks = signal<Stack[]>(this._load());
  readonly stacks = this._stacks.asReadonly();

  private _load(): Stack[] {
    if (!isPlatformBrowser(this._platformId)) {
      return [];
    }
    const raw = localStorage.getItem('devsnap:stacks');
    return raw ? JSON.parse(raw) : [];
  }

  private _persist() {
    localStorage.setItem('devsnap:stacks', JSON.stringify(this._stacks()));
  }

  add(stack: Stack): void {
    this._stacks.update((stacks) => [...stacks, stack]);
    this._persist();
  }

  remove(stack: Stack): void {
    this._stacks.update((stacks) => stacks.filter((s) => s.id !== stack.id));
    this._persist();
  }

  update(stack: Stack, changes: Partial<Stack>): void {
    this._stacks.update((stacks) =>
      stacks.map((s) => (s.id === stack.id ? { ...s, ...changes } : s)),
    );
    this._persist();
  }

  getById(id: string): Stack | undefined {
    return computed(() => this._stacks().find((s) => s.id === id))?.();
  }
}
