import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Episode } from '@app/core/models/episode.model';
import { EpisodeService } from '@app/core/services/episode.service';
import { CreateStackDialogComponent } from '@app/shared/components/create-stack-dialog.component';
import { EmptyStateComponent } from '@app/shared/components/empty-state.component';
import { StackCardComponent } from '../../components/stack-card/stack-card.component';
import { StackApiService } from '@app/core/services/stack-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Stack } from '@app/core/models/stack.model';
import { StackResponse } from '@app/core/models/stack-response.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EmptyStateComponent, StackCardComponent, MatDialogModule, MatButtonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly _dialog: MatDialog = inject(MatDialog);
  private readonly _episodeService: EpisodeService = inject(EpisodeService);
  private readonly _stackApiService: StackApiService = inject(StackApiService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _snackBar: MatSnackBar = inject(MatSnackBar);

  readonly loadFailed = signal(false);
  readonly isLoading = signal(true);

  readonly stacks = signal<Stack[]>([]);
  readonly episodes = toSignal(toObservable(this._episodeService.episodes), {
    initialValue: [] as Episode[],
  });

  readonly onCreateStack = (): void => {
    this._dialog.open(CreateStackDialogComponent, {
      width: '400px',
    });
  };

  constructor() {
    this._stackApiService
      .getStacks()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (stackResponse: StackResponse) => {
          this.stacks.set(stackResponse.stacks);
          this.isLoading.set(false);
        },
        error: () => {
          this.loadFailed.set(true);
          this.isLoading.set(false);
          this._snackBar.open(
            'Não foi possível carregar suas stacks. Verifique a conexão e recarregue a página.',
            'OK',
            { duration: 6000 },
          );
        },
      });
  }

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
