import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EpisodeFormComponent } from './episode-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quick-capture-dialog',
  standalone: true,
  templateUrl: './quick-capture-dialog.component.html',
  styleUrls: ['./quick-capture-dialog.component.scss'],
  imports: [MatDialogModule, EpisodeFormComponent],
})
export class QuickCaptureDialogComponent {
  private readonly _dialogRef = inject(MatDialogRef<QuickCaptureDialogComponent>);
  private readonly _snackBar = inject(MatSnackBar);

  onEpisodeSaved(): void {
    this._snackBar.open('Episódio salvo!', 'OK', { duration: 3000 });
    this._dialogRef.close();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this._dialogRef.close();
    }
  }
}
