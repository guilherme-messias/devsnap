import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StackService } from '../../core/services/stack.service';
import { v4 as uuidv4 } from 'uuid';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  private readonly _stackService: StackService = inject(StackService);
  private readonly _dialogRef = inject(MatDialogRef<CreateStackDialogComponent>);

  readonly form = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this._stackService.add({
      id: uuidv4(),
      name: this.form.controls.name.value.trim(),
      createdAt: new Date(),
    });
    this._dialogRef.close();
  }
}
