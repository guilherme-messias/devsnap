import { Component, Input } from '@angular/core';
import { Episode } from '../../core/models/episode.model';

@Component({
  selector: 'app-episode-list-item',
  standalone: true,
  templateUrl: './episode-list-item.component.html',
})
export class EpisodeListItemComponent {
  @Input() episode: Episode | undefined;
}
