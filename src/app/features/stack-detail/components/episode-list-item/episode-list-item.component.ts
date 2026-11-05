import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Episode } from '@app/core/models/episode.model';
import { EpisodeService } from '@app/core/services/episode.service';
import { PendingBadgeComponent } from '@app/shared/components/pending-badge.component';
import { RelativeDatePipe } from '@app/shared/pipes/relative-date.pipe';
import { UrgencyLevelPipe } from '@app/shared/pipes/urgency-level.pipe';

@Component({
  selector: 'app-episode-list-item',
  standalone: true,
  imports: [RelativeDatePipe, PendingBadgeComponent, UrgencyLevelPipe, RouterLink, MatIconModule],
  templateUrl: './episode-list-item.component.html',
  styleUrl: './episode-list-item.component.scss',
})
export class EpisodeListItemComponent {
  readonly episodeService = inject(EpisodeService);
  @Input() episode: Episode | undefined;
}
