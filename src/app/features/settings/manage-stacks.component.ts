import { Component, inject, Input } from '@angular/core';
import { Stack } from '../../core/models/stack.model';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { StackService } from '../../core/services/stack.service';
import { Router } from '@angular/router';
import { EpisodeService } from '../../core/services/episode.service';
import { FocusSessionService } from '../../core/services/focus-session.service';
import { CreateStackDialogComponent } from '../home/create-stack-dialog.component';

@Component({
  selector: 'app-manage-stacks',
  standalone: true,
  templateUrl: './manage-stacks.component.html',
  styleUrl: './manage-stacks.component.scss',
  imports: [DatePipe, MatButtonModule, MatIconModule, EmptyStateComponent],
})
export class ManageStacksComponent {
  @Input() stacks: Stack[] = [];

  private readonly _dialog = inject(MatDialog);
  private readonly _stackService = inject(StackService);
  private readonly _episodeService = inject(EpisodeService);
  private readonly _focusSessionService = inject(FocusSessionService);
  private readonly _router = inject(Router);

  readonly onCreateStack = (): void => {
    this._dialog.open(CreateStackDialogComponent, {
      width: '400px',
    });
  };

  onEdit(stack: Stack): void {
    const newName = prompt('Digite o novo nome da stack', stack.name);
    if (newName && newName.trim() !== stack.name) {
      this._stackService.update(stack, { name: newName });
    } else {
      alert('Nome da stack não pode ser vazio ou igual ao nome atual. Por favor, tente novamente.');
    }
    this._router.navigate(['/settings']);
  }

  onDelete(stack: Stack): void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Excluir stack',
        message: `Tem certeza que deseja excluir a stack "${stack.name}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._episodeService.removeByStack(stack.id);
        this._stackService.remove(stack);
        this._router.navigate(['/settings']);
      }
    });
  }

  onExport(): void {
    this._router.navigate(['/exportar']);
  }

  onDeleteAccount(): void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Excluir conta',
        message: 'Tem certeza que deseja excluir sua conta? Esta ação é irreversível.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._episodeService.reset();
        this._stackService.reset();
        this._focusSessionService.end();
        localStorage.clear();
        this._router.navigate(['/onboarding']);
      }
    });
  }
}
