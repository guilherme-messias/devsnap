import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-fab-capture',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  styleUrl: './fab-capture.component.scss',
  template: `
    <button mat-flat-button color="primary" aria-label="Capturar tela" [class.hidden]="hidden">
      <mat-icon>add</mat-icon>
    </button>
  `,
})
export class FabCaptureComponent {
  @Input() hidden = false;

  private _dialog = inject(MatDialog);

  openDialog(): void {
    // TODO: componente será criado
    // this._dialog.open(QuickCaptureDialogComponent);
  }
}
