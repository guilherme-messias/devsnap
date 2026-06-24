import { Component, inject } from '@angular/core';
import { StackService } from '../core/services/stack.service';
import { EpisodeService } from '../core/services/episode.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { toObservable } from '@angular/core/rxjs-interop';
import { EmptyStateComponent } from '../shared/components/empty-state.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EmptyStateComponent, StackCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly _router: Router = inject(Router);
  private readonly _stackService: StackService = inject(StackService);
  private readonly _episodeService: EpisodeService = inject(EpisodeService);

  readonly stacks = toSignal(toObservable(this._stackService.stacks));
  readonly episodes = toSignal(toObservable(this._episodeService.episodes));

  readonly onCreateStack = (): void => {
    void this._router.navigate(['/stacks/novo']);
  };
}
