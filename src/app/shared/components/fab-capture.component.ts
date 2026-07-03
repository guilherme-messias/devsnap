import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { QuickCaptureDialogComponent } from '../../features/episode-form/quick-capture-dialog.component';

@Component({
  selector: 'app-fab-capture',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  styleUrl: './fab-capture.component.scss',
  template: `
    <button mat-flat-button color="primary" aria-label="Capturar tela" (click)="openDialog()">
      <mat-icon>add</mat-icon>
    </button>
  `,
})
export class FabCaptureComponent {
  private _dialog = inject(MatDialog);

  openDialog(): void {
    this._dialog.open(QuickCaptureDialogComponent, {
      width: '400px',
    });
  }
}
