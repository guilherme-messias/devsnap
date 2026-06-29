import { Component, computed, inject } from '@angular/core';
import { Stack } from '../../core/models/stack.model';
import { Episode } from '../../core/models/episode.model';
import { StackService } from '../../core/services/stack.service';
import { EpisodeService } from '../../core/services/episode.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { toObservable } from '@angular/core/rxjs-interop';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { StackCardComponent } from './stack-card.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CreateStackDialogComponent } from './create-stack-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EmptyStateComponent, StackCardComponent, MatDialogModule, MatButtonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly _dialog: MatDialog = inject(MatDialog);
  private readonly _stackService: StackService = inject(StackService);
  private readonly _episodeService: EpisodeService = inject(EpisodeService);

  readonly stacks = toSignal(toObservable(this._stackService.stacks), { initialValue: [] as Stack[] });
  readonly episodes = toSignal(toObservable(this._episodeService.episodes), {
    initialValue: [] as Episode[],
  });

  readonly onCreateStack = (): void => {
    this._dialog.open(CreateStackDialogComponent, {
      width: '400px',
    });
  };

  welcomeMessage = computed(() => {
    const pendingCount = this._episodeService.pending()?.filter(
      (e) =>
        !e.reviewedAt && new Date(e.createdAt) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 dias
    ).length;

    if (pendingCount === 0) return 'Nenhum episódio pendente. Parabéns! Continue assim!';
    if (pendingCount === 1) return '1 episódio pendente. Vamos revisar? Não deixe para depois!';
    return `${pendingCount} episódios pendentes. Vamos revisar? Não deixe para depois!`;
  });
}
