import { Component, inject, signal } from '@angular/core';
import { StackService } from '../../core/services/stack.service';
import { EpisodeService } from '../../core/services/episode.service';
import { ExportService } from '../../core/services/export.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';

@Component({
  selector: 'app-export',
  standalone: true,
  imports: [MatCheckboxModule, MatButtonModule, MatIconModule, EmptyStateComponent],
  templateUrl: './export.component.html',
  styleUrl: './export.component.scss',
})
export class ExportComponent {
  private readonly _stackService = inject(StackService);
  private readonly _episodeService = inject(EpisodeService);
  private readonly _exportService = inject(ExportService);

  readonly stacks = this._stackService.stacks;
  readonly selectedIds = new Set<string>();
  readonly exported = signal<boolean>(false);

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
    const selectedStacks = this.stacks().filter((s) => this.selectedIds.has(s.id));
    const allEpisodes = this._episodeService.episodes();
    const episodes = allEpisodes.filter((e) => selectedStacks.some((s) => s.id === e.stackId));
    this._exportService.exportMultiple(selectedStacks, episodes);

    this.selectedIds.clear();
    this.exported.set(true);
  }
}
