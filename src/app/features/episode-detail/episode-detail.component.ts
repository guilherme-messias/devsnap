import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EpisodeService } from '../../core/services/episode.service';
import { Episode } from '../../core/models/episode.model';
import { CodeSnippetComponent } from '../../shared/components/code-snippet.component';
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { StackService } from '../../core/services/stack.service';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  templateUrl: './episode-detail.component.html',
  imports: [CodeSnippetComponent, MatChipsModule, DatePipe],
})
export class EpisodeDetailComponent implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _episodeService = inject(EpisodeService);
  private readonly _stackService = inject(StackService);

  readonly episode = signal<Episode | undefined>(undefined);
  readonly solutionRevealed = signal(false);

  ngOnInit(): void {
    const episodeId = this._route.snapshot.paramMap.get('eid');
    if (episodeId) {
      this.episode.set(this._episodeService.getById(episodeId));
    }
  }

  revealSolution(): void {
    this.solutionRevealed.set(true);
  }

  getStackName(stackId: string): string {
    return this._stackService.getById(stackId)?.name ?? '';
  }
}
