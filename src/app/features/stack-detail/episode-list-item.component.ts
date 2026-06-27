import { Component, Input } from '@angular/core';
import { Episode } from '../../core/models/episode.model';
import { RelativeDatePipe } from '../../shared/pipes/relative-date.pipe';
import { PendingBadgeComponent } from '../../shared/components/pending-badge.component';
import { UrgencyLevelPipe } from '../../shared/pipes/urgency-level.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-episode-list-item',
  standalone: true,
  imports: [RelativeDatePipe, PendingBadgeComponent, UrgencyLevelPipe, RouterLink],
  templateUrl: './episode-list-item.component.html',
})
export class EpisodeListItemComponent {
  @Input() episode: Episode | undefined;
}
