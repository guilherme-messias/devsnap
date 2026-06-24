import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-create-stack-dialog',
  standalone: true,
  templateUrl: './create-stack-dialog.component.html',
  imports: [MatDialogModule],
})
export class CreateStackDialogComponent {}
