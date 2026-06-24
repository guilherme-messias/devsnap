import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  template: `
    <div class="w-full bg-gray-200 rounded-full h-2">
      <div
        class="bg-indigo-600 h-2 rounded-full transition-all"
        [style.width.%]="(reviewed / total) * 100"
      ></div>
    </div>
  `,
})
export class ProgressBarComponent {
  @Input() reviewed: number = 0;
  @Input() total: number = 1;
}
