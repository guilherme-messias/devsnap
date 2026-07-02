import { Component, Input } from '@angular/core';
import { Annotation } from '../../core/models/episode.model';
import { RelativeDatePipe } from '../../shared/pipes/relative-date.pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-annotation-list',
  standalone: true,
  styleUrl: './annotation-list.component.scss',
  template: `
    @if (annotations.length === 0) {
      <div class="flex flex-col items-center gap-2 py-6 text-center">
        <mat-icon aria-hidden="true" aria-label="Nenhuma anotação registrada ainda." style="color: var(--color-text-secondary)">
          sticky_note_2
        </mat-icon>
        <p class="text-sm" aria-label="Nenhuma anotação registrada ainda." style="color: var(--color-text-secondary)">
          Nenhuma anotação registrada ainda.
        </p>
      </div>
    } @else {
      <ul class="flex flex-col gap-3" role="list">
        @for (annotation of annotations; track annotation.id) {
          <li class="annotation-item flex flex-col gap-2 rounded-lg p-4">
            <p class="text-sm leading-relaxed" style="color: var(--color-text-primary)">
              {{ annotation.text }}
            </p>
            <time
              class="text-xs"
              style="color: var(--color-text-secondary)"
              [attr.datetime]="annotation.createdAt"
            >
              {{ annotation.createdAt | relativeDate }}
            </time>
          </li>
        }
      </ul>
    }
  `,
  imports: [RelativeDatePipe, MatIconModule],
})
export class AnnotationListComponent {
  @Input() annotations: Annotation[] = [];
}
