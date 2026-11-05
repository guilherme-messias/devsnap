import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { EpisodeApiService } from '@app/core/services/episode-api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EpisodeService } from '@app/core/services/episode.service';
import { EmptyStateComponent } from '@app/shared/components/empty-state.component';
import { EpisodeListItemComponent } from '../../components/episode-list-item/episode-list-item.component';
import { StackApiService } from '@app/core/services/stack-api.service';
import { StackDetailResponse } from '@app/core/models/stack-detail-response.model';
import { EpisodeListResponse } from '@app/core/models/episode-list-response.model';
import { EpisodeDetailResponse } from '@app/core/models/episode-detail-response.model';

@Component({
  selector: 'app-stack-detail',
  standalone: true,
  imports: [
    EpisodeListItemComponent,
    EmptyStateComponent,
    RouterLink,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './stack-detail.component.html',
  styleUrl: './stack-detail.component.scss',
})
export class StackDetailComponent implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _stackApiService: StackApiService = inject(StackApiService);
  private readonly _episodeApiService = inject(EpisodeApiService);
  private readonly _episodeService = inject(EpisodeService);
  private readonly _router = inject(Router);

  readonly stack = signal<StackDetailResponse | null>(null);
  readonly episode = signal<EpisodeDetailResponse | null>(null);
  readonly episodes = signal<EpisodeListResponse | null>(null);
  readonly filter = signal<'all' | 'pending' | 'reviewed'>('all');
  readonly searchQuery = signal('');

  ngOnInit(): void {
    const stackId = this._route.snapshot.paramMap.get('id');
    if (!stackId) {
      this._router.navigate(['/']);
      return;
    }

    this._stackApiService.getStackById(stackId).subscribe({
      next: (response) => {
        if (!response?.stack) {
          this._router.navigate(['/']);
          return;
        }
        this.stack.set(response);
      },
      error: () => this._router.navigate(['/']),
    });
  }

  readonly onCreateEpisode = (): void => {
    this._router.navigate(['/stacks', this.stack()?.stack?.id, 'episodios', 'novo']);
  };

  readonly filteredEpisodes = computed(() => {
    const filter = this.filter();
    const stackId = this.stack()?.stack?.id;
    if (!stackId) return [];

    this._episodeApiService.getEpisodes().subscribe({
      next: (episodes) => {
        this.episodes.set(episodes);
      },
    });

    let episodes =
      this.episodes()?.episodes.filter((e) => e.stackId === this.episode()?.episode.stackId) ?? [];

    const searchQuery = this.searchQuery().trim().toLowerCase();
    if (searchQuery) {
      episodes = episodes.filter(
        (e) =>
          e.title.toLowerCase().includes(searchQuery) ||
          e.error.toLowerCase().includes(searchQuery) ||
          e.solution.toLowerCase().includes(searchQuery) ||
          e.annotations.some((annotation) => annotation.text.toLowerCase().includes(searchQuery)),
      );
    }

    if (!episodes) return [];
    if (filter === 'pending') return episodes.filter((e) => !this._episodeService.isReviewed(e.id));
    if (filter === 'reviewed') return episodes.filter((e) => this._episodeService.isReviewed(e.id));
    return episodes;
  });

  readonly sortedEpisodes = computed(() => {
    return this.filteredEpisodes()?.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  });

  updateFilter(filter: 'all' | 'pending' | 'reviewed'): void {
    this.filter.set(filter);
  }

  updateSearchQuery(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }
}
