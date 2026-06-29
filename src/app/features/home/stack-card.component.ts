import { Component, computed, inject, Input } from '@angular/core';
import { Stack } from '../../core/models/stack.model';
import { EpisodeService } from '../../core/services/episode.service';
import { PendingBadgeComponent } from '../../shared/components/pending-badge.component';
import { UrgencyLevelPipe } from '../../shared/pipes/urgency-level.pipe';
import { ProgressBarComponent } from '../../shared/components/progress-bar.component';
import { PendingCountPipe } from '../../shared/pipes/pending-count.pipe';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
