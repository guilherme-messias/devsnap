import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class KeyboardShortcutService {
  private readonly _dialog: MatDialog = inject(MatDialog);

  init(): void {
    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'N') {
        event.preventDefault();
        // TODO: componente será criado
        //
        // this._dialog.open(QuickCaptureDialogComponent);
      }
    });
  }
}
