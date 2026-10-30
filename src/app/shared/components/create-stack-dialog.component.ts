import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StackApiService } from '@app/core/services/stack-api.service';

@Component({
  selector: 'app-create-stack-dialog',
  standalone: true,
  templateUrl: './create-stack-dialog.component.html',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class CreateStackDialogComponent {
  private readonly _dialogRef = inject(MatDialogRef<CreateStackDialogComponent>);
  private readonly _stackApiService: StackApiService = inject(StackApiService);
  private readonly _destroyRef = inject(DestroyRef);

  readonly form = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  readonly errorMessage = signal<string>('');
  readonly isLoading = signal(false);

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const stackName = this.form.controls.name.value.trim();

    this.isLoading.set(true);
    this._stackApiService
      .createStack(stackName)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this._dialogRef.close();
        },
        error: (error: { error?: { message?: string } }) => {
          this.isLoading.set(false);
          this.errorMessage.set(
            error?.error?.message ?? 'Não foi possível criar a stack. Tente novamente.',
          );
        },
      });
  }
}
