import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { StackApiService } from '@app/core/services/stack-api.service';

@Component({
  selector: 'app-delete-stack-dialog',
  standalone: true,
  templateUrl: './delete-stack-dialog.component.html',
  styleUrl: './delete-stack-dialog.component.scss',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
})
export class DeleteStackDialogComponent {
  private readonly _dialogRef = inject(MatDialogRef<DeleteStackDialogComponent, boolean>);
  private readonly _stackApiService = inject(StackApiService);
  private readonly _destroyRef = inject(DestroyRef);
  readonly data = inject<{ id: string; name: string }>(MAT_DIALOG_DATA);

  readonly errorMessage = signal<string>('');

  confirm(): void {
    this._stackApiService
      .deleteStack(this.data.id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this._dialogRef.close(true);
        },
        error: (error: { error?: { message?: string } }) => {
          this.errorMessage.set(
            error?.error?.message ?? 'Não foi possível excluir a stack. Tente novamente.',
          );
        },
      });
  }
}
