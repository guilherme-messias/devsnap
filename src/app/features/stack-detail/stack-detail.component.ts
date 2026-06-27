import { Component, computed, inject, signal, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StackService } from '../../core/services/stack.service';
import { Stack } from '../../core/models/stack.model';
import { EpisodeService } from '../../core/services/episode.service';

@Component({
  selector: 'app-stack-detail',
  standalone: true,
  templateUrl: './stack-detail.component.html',
})
export class StackDetailComponent {
  private readonly _route = inject(ActivatedRoute);
  private readonly _stackService = inject(StackService);
  private readonly _episodeService = inject(EpisodeService);

  readonly stack = signal<Stack | undefined>(undefined);
  readonly filter = signal<'all' | 'pending' | 'reviewed'>('all');
  readonly searchQuery = signal('');

  ngOnInit(): void {
    const stackId = this._route.snapshot.paramMap.get('id');
    this.stack.set(this._stackService.getById(stackId));
  }

  readonly filteredEpisodes = computed(() => {
    const filter = this.filter();
    const stackId = this.stack()?.id;
    if (!stackId) return [];

    let episodes = this._episodeService.getByStack(stackId);

    const searchQuery = this.searchQuery().trim().toLowerCase();
    if (searchQuery) {
      episodes = episodes.filter(
        (e) =>
          e.title.toLowerCase().includes(searchQuery) ||
          e.error.toLowerCase().includes(searchQuery) ||
          e.solution.toLowerCase().includes(searchQuery) ||
          e.reasoning.toLowerCase().includes(searchQuery) ||
          e.snippets?.toLowerCase().includes(searchQuery) ||
          e.tags?.some((t) => t.toLowerCase().includes(searchQuery)),
      );
    }

    if (!episodes) return [];
    if (filter === 'pending') return episodes.filter((e) => !e.reviewedAt);
    if (filter === 'reviewed') return episodes.filter((e) => e.reviewedAt);
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
