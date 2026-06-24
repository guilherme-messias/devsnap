import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="flex flex-col items-center gap-4 py-12 text-center">
      <mat-icon class="text-gray-400 text-5xl">inbox</mat-icon>
      <p class="text-gray-500">{{ message }}</p>
      <button class="bg-indigo-600 text-white px-4 py-2 rounded" (click)="ctaClick()">
        {{ ctaLabel }}
      </button>
    </div>
  `,
})
export class EmptyStateComponent {
  @Input() message = '';
  @Input() ctaLabel = '';
  @Input() ctaClick = () => {};
}
