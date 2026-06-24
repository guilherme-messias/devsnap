import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-fab-capture',
  standalone: true,
  template: `
    <button mat-fab color="primary" aria-label="Capturar tela">
      <mat-icon>camera</mat-icon>
    </button>
  `,
  imports: [MatIcon],
})
export class FabCaptureComponent {}
