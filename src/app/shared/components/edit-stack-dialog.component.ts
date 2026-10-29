import { Component, DestroyRef, inject, signal } from '@angular/core';
import { StackApiService } from '@app/core/services/stack-api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-edit-stack-dialog',
  standalone: true,
  templateUrl: './edit-stack-dialog.component.html',
  styleUrl: './edit-stack-dialog.component.scss',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class EditStackDialogComponent {
  private readonly _dialogRef = inject(MatDialogRef<EditStackDialogComponent, string>);
  private readonly _stackApiService = inject(StackApiService);
  private readonly _destroyRef = inject(DestroyRef);
  readonly data = inject<{ id: string; name: string }>(MAT_DIALOG_DATA);

  readonly form = new FormGroup({
    name: new FormControl<string>(this.data.name, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  readonly errorMessage = signal<string>('');

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this._stackApiService
      .updateStack(this.data.id, this.form.controls.name.value.trim())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this._dialogRef.close(this.form.controls.name.value.trim());
        },
        error: (error: { error?: { message?: string } }) => {
          this.errorMessage.set(
            error?.error?.message ?? 'Não foi possível criar a stack. Tente novamente.',
          );
        },
      });
  }
}
