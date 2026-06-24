import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class KeyboardShortcutService {
  private readonly _dialog: MatDialog = inject(MatDialog);
  private readonly _platformId = inject(PLATFORM_ID);

  init(): void {
    if (!isPlatformBrowser(this._platformId)) return;

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
