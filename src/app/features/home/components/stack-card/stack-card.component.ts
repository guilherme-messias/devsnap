import { Component, computed, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Stack } from '@app/core/models/stack.model';
import { EpisodeService } from '@app/core/services/episode.service';
import { PendingBadgeComponent } from '@app/shared/components/pending-badge.component';
import { ProgressBarComponent } from '@app/shared/components/progress-bar.component';
import { PendingCountPipe } from '@app/shared/pipes/pending-count.pipe';
import { UrgencyLevelPipe } from '@app/shared/pipes/urgency-level.pipe';

@Component({
  selector: 'app-stack-card',
  standalone: true,
  imports: [
    PendingBadgeComponent,
    UrgencyLevelPipe,
    ProgressBarComponent,
    PendingCountPipe,
    RouterLink,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './stack-card.component.html',
  styleUrl: './stack-card.component.scss',
})
export class StackCardComponent {
  @Input() stack!: Stack;

  private readonly _episodeService: EpisodeService = inject(EpisodeService);

  episodesForStack = computed(() => this._episodeService.getByStack(this.stack.id));
}
