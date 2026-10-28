import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

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
  readonly data = inject<{ name: string }>(MAT_DIALOG_DATA);

  readonly form = new FormGroup({
    name: new FormControl<string>(this.data.name, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  readonly errorMessage = signal<string>('');

  // TODO: integrar com a API de stacks
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this._dialogRef.close(this.form.controls.name.value.trim());
  }
}
