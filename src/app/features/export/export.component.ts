import { Component, inject } from '@angular/core';
import { StackService } from '../../core/services/stack.service';
import { EpisodeService } from '../../core/services/episode.service';
import { ExportService } from '../../core/services/export.service';

@Component({
  selector: 'app-export',
  standalone: true,
  templateUrl: './export.component.html',
})
export class ExportComponent {
  private readonly _stackService = inject(StackService);
  private readonly _episodeService = inject(EpisodeService);
  private readonly _exportService = inject(ExportService);
}
