import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { StackApiService } from '@app/core/services/stack-api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Episode } from '@app/core/models/episode.model';
import { EpisodeService } from '@app/core/services/episode.service';
import { v4 as uuidv4 } from 'uuid';
import { StackListResponse } from '@app/core/models/stack-list-response.model';

@Component({
  selector: 'app-episode-form',
  standalone: true,
  templateUrl: './episode-form.component.html',
  styleUrl: './episode-form.component.scss',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class EpisodeFormComponent implements OnChanges {
  @Input() initialData?: Episode;
  @Output() saved = new EventEmitter<void>();

  private readonly _episodeService = inject(EpisodeService);
  private readonly _stackApiService = inject(StackApiService);
  private readonly _router = inject(Router);
  private readonly _fb = inject(FormBuilder);

  readonly stacks = signal<StackListResponse | null>(null);
  readonly form: FormGroup;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData) {
      this.form.patchValue({
        stackId: this.initialData.stackId,
        episodeData: {
          title: this.initialData.title,
          error: this.initialData.error,
          solution: this.initialData.solution,
        },
      });
    }
  }

  constructor() {
    this.form = this._fb.group({
      stackId: ['', Validators.required],
      episodeData: this._fb.group({
        title: ['', Validators.required],
        error: ['', Validators.required],
        solution: ['', Validators.required],
      }),
    });

    this._stackApiService.getStacks().subscribe({
      next: (stacks) => {
        this.stacks.set(stacks);
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    const formValue = this.form.getRawValue();
    const stack = this.stacks()?.stacks.find((item) => item.id === formValue.stackId);

    if (!stack) {
      this.form.controls['stackId'].setErrors({ unavailable: true });
      return;
    }

    if (this.initialData) {
      this._episodeService.update(this.initialData, {
        stack,
        stackId: formValue.stackId,
        title: formValue.episodeData.title,
        error: formValue.episodeData.error,
        solution: formValue.episodeData.solution,
        updatedAt: new Date().toISOString(),
      });
    } else {
      const now = new Date().toISOString();
      const episode: Episode = {
        id: uuidv4(),
        title: formValue.episodeData.title,
        stackId: formValue.stackId,
        stack,
        error: formValue.episodeData.error,
        solution: formValue.episodeData.solution,
        annotations: [],
        createdAt: now,
        updatedAt: now,
      };
      this._episodeService.add(episode);
    }

    this.saved.emit();

    if (!this.saved.observed) {
      this._router.navigate(['/stacks', formValue.stackId]);
    }
  }
}
