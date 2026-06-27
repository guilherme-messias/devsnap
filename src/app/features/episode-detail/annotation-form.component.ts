import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { v4 as uuidv4 } from 'uuid';
import { Episode } from '../../core/models/episode.model';
import { EpisodeService } from '../../core/services/episode.service';

@Component({
  selector: 'app-annotation-form',
  standalone: true,
  styleUrl: './annotation-form.component.scss',
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
      class="annotation-form-divider flex flex-col gap-4 border-t pt-4"
    >
      <mat-form-field class="w-full" appearance="outline">
        <mat-label>Nota</mat-label>
        <textarea
          matInput
          formControlName="text"
          rows="3"
          placeholder="Digite sua nota aqui"
        ></textarea>
      </mat-form-field>

      <button
        mat-flat-button
        color="primary"
        type="submit"
        class="self-start"
        [disabled]="form.invalid"
      >
        Adicionar nota
      </button>
    </form>
  `,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class AnnotationFormComponent {
  @Input({ required: true }) episode!: Episode;

  private readonly _episodeService = inject(EpisodeService);
  private readonly _fb = inject(FormBuilder);

  readonly form: FormGroup;

  constructor() {
    this.form = this._fb.group({
      text: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this._episodeService.update(this.episode, {
      annotations: [
        ...(this.episode.annotations ?? []),
        {
          id: uuidv4(),
          text: this.form.value.text,
          createdAt: new Date(),
        },
      ],
    });

    this.form.reset();
  }
}
