import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class KeyboardShortcutService {

  constructor(private dialog: MatDialog) { }
  
  init(): void {
    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'N') {
        event.preventDefault();
        // TODO: componente será criado
        // 
        // this.dialog.open(QuickCaptureDialogComponent);
        }
      });
    }
  }
