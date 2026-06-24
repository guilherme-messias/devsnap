import { computed, Injectable, signal } from '@angular/core';
import { Stack } from '../models/stack.model';

@Injectable({ providedIn: 'root' })
export class StackService {
  private _stacks = signal<Stack[]>(this._load());
  readonly stacks = this._stacks.asReadonly();

  private _load(): Stack[] {
    return localStorage.getItem('devsnap:stacks')
      ? JSON.parse(localStorage.getItem('devsnap:stacks') || '[]')
      : [];
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
