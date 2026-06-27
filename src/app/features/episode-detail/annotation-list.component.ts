import { Component, Input } from '@angular/core';
import { Annotation } from '../../core/models/episode.model';
import { RelativeDatePipe } from '../../shared/pipes/relative-date.pipe';

@Component({
  selector: 'app-annotation-list',
  standalone: true,

  template: `
    <div>
      @for (annotation of annotations; track annotation.id) {
        <div class="flex flex-col gap-2">
          <p>{{ annotation.text }}</p>
          <p>{{ annotation.createdAt | relativeDate }}</p>
        </div>
      }
    </div>
  `,
  imports: [RelativeDatePipe],
})
export class AnnotationListComponent {
  @Input() annotations: Annotation[];
}
