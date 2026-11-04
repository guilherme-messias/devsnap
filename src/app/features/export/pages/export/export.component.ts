import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { StackListResponse } from '@app/core/models/stack-list-response.model';
import { EpisodeService } from '@app/core/services/episode.service';
import { ExportService } from '@app/core/services/export.service';
import { StackApiService } from '@app/core/services/stack-api.service';
import { CreateStackDialogComponent } from '@app/shared/components/create-stack-dialog.component';
import { EmptyStateComponent } from '@app/shared/components/empty-state.component';

@Component({
  selector: 'app-export',
  standalone: true,
  imports: [MatCheckboxModule, MatButtonModule, MatIconModule, EmptyStateComponent],
  templateUrl: './export.component.html',
  styleUrl: './export.component.scss',
})
export class ExportComponent {
  private readonly _dialog: MatDialog = inject(MatDialog);
  private readonly _stackApiService = inject(StackApiService);
  private readonly _episodeService = inject(EpisodeService);
  private readonly _exportService = inject(ExportService);

  readonly stacks = signal<StackListResponse | null>(null);
  readonly isLoading = signal<boolean>(true);

  constructor() {
    this._stackApiService.getStacks().subscribe({
      next: (stacks) => {
        this.stacks.set(stacks);
      },
    });
  }
  readonly selectedIds = new Set<string>();
  readonly exported = signal<boolean>(false);

  readonly onCreateStack = (): void => {
    this._dialog.open(CreateStackDialogComponent, {
      width: '400px',
    });
  };

  episodeCount(stackId: string): number {
    return this._episodeService.episodes().filter((e) => e.stackId === stackId).length;
  }

  toggleSelection(id: string, checked: boolean): void {
    if (checked) {
      this.selectedIds.add(id);
    } else {
      this.selectedIds.delete(id);
    }
  }

  onExport(): void {
    const selectedStacks =
      this.stacks()?.stacks?.filter((s: { id: string }) => this.selectedIds.has(s.id)) ?? [];
    const allEpisodes = this._episodeService.episodes();
    const episodes = allEpisodes.filter((e) =>
      selectedStacks.some((s: { id: string }) => s.id === e.stackId),
    );
    this._exportService.exportMultiple(selectedStacks, episodes);

    this.selectedIds.clear();
    this.exported.set(true);
  }
}
