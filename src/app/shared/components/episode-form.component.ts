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
import { EpisodeApiService } from '@app/core/services/episode-api.service';
import { StackApiService } from '@app/core/services/stack-api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Episode } from '@app/core/models/episode.model';
import { StackListResponse } from '@app/core/models/stack-list-response.model';
import { episodeRequest } from '@app/core/models/episode-request';

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

  private readonly _stackApiService = inject(StackApiService);
  private readonly _episodeApiService = inject(EpisodeApiService);
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

    const request: episodeRequest = {
      title: formValue.episodeData.title,
      stackId: formValue.stackId,
      error: formValue.episodeData.error,
      solution: formValue.episodeData.solution,
    };

    if (this.initialData) {
      const episodeId = this.initialData.id;
      this._episodeApiService.updateEpisode(request, episodeId);
    } else {
      this._episodeApiService.createEpisode(request);
    }

    this.saved.emit();

    if (!this.saved.observed) {
      this._router.navigate(['/stacks', formValue.stackId]);
    }
  }
}
