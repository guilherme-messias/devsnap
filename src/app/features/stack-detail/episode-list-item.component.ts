import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Episode } from '../../core/models/episode.model';
import { RelativeDatePipe } from '../../shared/pipes/relative-date.pipe';
import { PendingBadgeComponent } from '../../shared/components/pending-badge.component';
import { UrgencyLevelPipe } from '../../shared/pipes/urgency-level.pipe';

@Component({
  selector: 'app-episode-list-item',
  standalone: true,
  imports: [RelativeDatePipe, PendingBadgeComponent, UrgencyLevelPipe, RouterLink, MatIconModule],
  templateUrl: './episode-list-item.component.html',
  styleUrl: './episode-list-item.component.scss',
})
export class EpisodeListItemComponent {
  @Input() episode: Episode | undefined;
}
