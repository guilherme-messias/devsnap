import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-card',
  standalone: true,
  template: `
    <div class="animate-pulse p-4 rounded-lg border border-gray-200 space-y-3">
      <div class="bg-gray-200 rounded h-4 w-3/4"></div>
      <div class="bg-gray-200 rounded h-3 w-1/2"></div>
      <div class="bg-gray-200 rounded h-3 w-full"></div>
    </div>
  `,
})
export class SkeletonCardComponent {}
