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

  ngOnInit(): void {
    const stackId = this._route.snapshot.paramMap.get('id');
    this.stack.set(this._stackService.getById(stackId));
  }

  readonly filteredEpisodes = computed(() => {
    const filter = this.filter();
    const stackId = this.stack()?.id;
    if (!stackId) return [];

    const episodes = this._episodeService.getByStack(stackId);

    if (!episodes) return [];
    if (filter === 'pending') return episodes.filter((e) => !e.reviewedAt);
    if (filter === 'reviewed') return episodes.filter((e) => e.reviewedAt);
    return episodes;
  });
}
