import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pending-badge',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './pending-badge.component.html',
  styleUrl: './pending-badge.component.scss',
})
export class PendingBadgeComponent {
  @Input() level: 'urgent' | 'moderate' | 'ok' = 'ok';
}
