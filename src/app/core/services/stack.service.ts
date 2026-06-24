import { Injectable, signal } from '@angular/core';
import { Stack } from '../models/stack.model';

@Injectable({ providedIn: 'root' })
export class StackService {
  private _stacks = signal<Stack[]>(this._load());

  private _load(): Stack[] {
    return localStorage.getItem('devsnap:stacks')
      ? JSON.parse(localStorage.getItem('devsnap:stacks') || '[]')
      : [];
  }

  private _persist() {
    localStorage.setItem('devsnap:stacks', JSON.stringify(this._stacks()));
  }
}
