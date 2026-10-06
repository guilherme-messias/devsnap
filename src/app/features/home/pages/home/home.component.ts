import { Component, computed, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Episode } from '@app/core/models/episode.model';
import { Stack } from '@app/core/models/stack.model';
import { EpisodeService } from '@app/core/services/episode.service';
import { StackService } from '@app/core/services/stack.service';
import { CreateStackDialogComponent } from '@app/shared/components/create-stack-dialog.component';
import { EmptyStateComponent } from '@app/shared/components/empty-state.component';
import { StackCardComponent } from '../../components/stack-card/stack-card.component';

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
