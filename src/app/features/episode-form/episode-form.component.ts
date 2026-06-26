import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { StackService } from '../../core/services/stack.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EpisodeService } from '../../core/services/episode.service';
import { v4 as uuidv4 } from 'uuid';
import { Episode } from '../../core/models/episode.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-episode-form',
  standalone: true,
  templateUrl: './episode-form.component.html',
  styleUrl: './episode-form.component.scss',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class EpisodeFormComponent {
  form: FormGroup;

  currentTag = signal<string>('');

  private readonly _episodeService = inject(EpisodeService);

  private readonly _stackService = inject(StackService);

  private readonly _router = inject(Router);
  readonly stacks = this._stackService.stacks;

  readonly separatorKeysCodes = [ENTER, COMMA];

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.form = this._fb.group({
      stackId: ['', Validators.required],
      episodeData: this._fb.group({
        title: ['', Validators.required],
        error: ['', Validators.required],
        attempts: ['', Validators.required],
        solution: ['', Validators.required],
        reasoning: ['', Validators.required],
      }),
      snippets: [''],
      tags: [[] as string[]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const episode: Episode = {
      id: uuidv4(),
      stackId: this.form.value.stackId,
      title: this.form.value.episodeData.title,
      error: this.form.value.episodeData.error,
      attempts: this.form.value.episodeData.attempts,
      solution: this.form.value.episodeData.solution,
      reasoning: this.form.value.episodeData.reasoning,
      snippets: this.form.value.snippets,
      tags: this.form.value.tags,
      createdAt: new Date(),
    };

    this._episodeService.add(episode);
    this._router.navigate(['/stacks', this.form.value.stackId]);
  }

  get tagsValue(): string[] {
    return this.form.controls['tags'].value ?? [];
  }

  addTag(event: MatChipInputEvent): void {
    const value = event.value.trim();
    if (value) {
      this.form.controls['tags'].setValue([...this.form.controls['tags'].value, value]);
    }
    this.currentTag.set('');
  }

  removeTag(tag: string): void {
    this.form.controls['tags'].setValue(
      this.form.controls['tags'].value.filter((t: string) => t !== tag),
    );
  }
}
