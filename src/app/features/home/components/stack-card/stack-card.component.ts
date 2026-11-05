import { Component, inject, Input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { EpisodeDetailResponse } from '@app/core/models/episode-detail-response.model';
import { EpisodeListResponse } from '@app/core/models/episode-list-response.model';
import { Stack } from '@app/core/models/stack.model';
import { EpisodeApiService } from '@app/core/services/episode-api.service';
import { PendingBadgeComponent } from '@app/shared/components/pending-badge.component';
import { ProgressBarComponent } from '@app/shared/components/progress-bar.component';
import { ReviewedCountPipe } from '@app/shared/pipes/reviewed-count.pipe';
import { UrgencyLevelPipe } from '@app/shared/pipes/urgency-level.pipe';

@Component({
  selector: 'app-stack-card',
  standalone: true,
  imports: [
    PendingBadgeComponent,
    UrgencyLevelPipe,
    ProgressBarComponent,
    ReviewedCountPipe,
    RouterLink,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './stack-card.component.html',
  styleUrl: './stack-card.component.scss',
})
export class StackCardComponent {
  @Input() stack!: Stack;

  private readonly _episodeApiService: EpisodeApiService = inject(EpisodeApiService);
  readonly episode = signal<EpisodeDetailResponse | null>(null);
  readonly episodes = signal<EpisodeListResponse | null>(null);

  ngOnInit(): void {
    this._episodeApiService.getEpisodes().subscribe({
      next: (episodes) => {
        this.episodes.set(episodes);
      },
    });
    
    this.episodes()?.episodes.filter((e) => e.stackId === this.episode()?.episode.stackId) ?? [];
  }
}
