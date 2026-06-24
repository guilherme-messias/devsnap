import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pending-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (level === 'urgent') {
      <span class="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Urgente</span>
    }
    @if (level === 'moderate') {
      <span class="bg-yellow-400 text-white text-xs px-2 py-1 rounded-full">Moderado</span>
    }
    @if (level === 'ok') {
      <span class="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Em dia</span>
    }
  `,
})
export class PendingBadgeComponent {
  @Input() level: 'urgent' | 'moderate' | 'ok' = 'ok';
}
