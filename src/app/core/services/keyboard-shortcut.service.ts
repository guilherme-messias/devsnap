import { afterNextRender, inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuickCaptureDialogComponent } from '@app/shared/components/quick-capture-dialog.component';

@Injectable({ providedIn: 'root' })
export class KeyboardShortcutService {
  private readonly _dialog = inject(MatDialog);

  constructor() {
    afterNextRender(() => {
      document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.altKey && event.code === 'KeyN') {
          event.preventDefault();
          this._dialog.open(QuickCaptureDialogComponent, {
            width: '400px',
            maxHeight: '90dvh',
          });
        }
      });
    });
  }
}
