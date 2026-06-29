import { Component, inject } from '@angular/core';
import { StackService } from '../../core/services/stack.service';
import { EpisodeService } from '../../core/services/episode.service';
import { ExportService } from '../../core/services/export.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-export',
  standalone: true,
  imports: [MatCheckboxModule],
  templateUrl: './export.component.html',
})
export class ExportComponent {
  private readonly _stackService = inject(StackService);
  private readonly _episodeService = inject(EpisodeService);
  private readonly _exportService = inject(ExportService);

  readonly stacks = this._stackService.stacks;
  readonly selectedIds = new Set<string>();

  toggleSelection(id: string, checked: boolean): void {
    if (checked) {
      this.selectedIds.add(id);
    } else {
      this.selectedIds.delete(id);
    }
  }
}
