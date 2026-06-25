import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StackService } from '../core/services/stack.service';
import { v4 as uuidv4 } from 'uuid';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-stack-dialog',
  standalone: true,
  templateUrl: './create-stack-dialog.component.html',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule],
})
export class CreateStackDialogComponent {
  private readonly _stackService: StackService = inject(StackService);
  private readonly _dialogRef = inject(MatDialogRef<CreateStackDialogComponent>);

  readonly form = new FormGroup({
    name: new FormControl<string>(''),
  });

  save(): void {
    this._stackService.add({
      id: uuidv4(),
      name: this.form.get('name')?.value,
      createdAt: new Date(),
    });
    this._dialogRef.close();
  }
}
