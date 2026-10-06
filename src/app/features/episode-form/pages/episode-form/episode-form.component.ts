import { Component } from '@angular/core';
import { EpisodeFormComponent as SharedEpisodeFormComponent } from '@app/shared/components/episode-form.component';

@Component({
  selector: 'app-episode-form-page',
  standalone: true,
  template: `<app-episode-form />`,
  imports: [SharedEpisodeFormComponent],
})
export class EpisodeFormPage {}
