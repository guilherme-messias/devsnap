import { Component, inject, Input } from '@angular/core';
import { Stack } from '../../core/models/stack.model';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog.component';
import { StackService } from '../../core/services/stack.service';
import { Router } from '@angular/router';
import { EpisodeService } from '../../core/services/episode.service';

@Component({
  selector: 'app-manage-stacks',
  standalone: true,
  templateUrl: './manage-stacks.component.html',
  imports: [DatePipe, MatButtonModule],
})
export class ManageStacksComponent {
  @Input() stacks: Stack[] = [];

  private readonly _dialog = inject(MatDialog);
  private readonly _stackService = inject(StackService);
  private readonly _episodeService = inject(EpisodeService);
  private readonly _router = inject(Router);

  onEdit(stack: Stack): void {
    // this._router.navigate(['/stacks', stack.id, 'editar']);
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
}
