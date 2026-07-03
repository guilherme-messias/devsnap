import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
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
import { OnInit } from '@angular/core';

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
export class EpisodeFormComponent implements OnInit {
  @Input() initialData?: Episode;
  @Output() saved = new EventEmitter<void>();

  private readonly _episodeService = inject(EpisodeService);
  private readonly _stackService = inject(StackService);
  private readonly _router = inject(Router);
  private readonly _fb = inject(FormBuilder);

  readonly currentTag = signal<string>('');
  readonly stacks = this._stackService.stacks;
  readonly separatorKeysCodes = [ENTER, COMMA];
  readonly form: FormGroup;

  ngOnInit(): void {
    if (this.initialData) {
      this.form.patchValue(this.initialData);
      this.form.controls['stackId'].setValue(this.initialData.stackId);
      this.form.controls['episodeData'].patchValue({
        title: this.initialData.title,
        error: this.initialData.error,
        attempts: this.initialData.attempts,
        solution: this.initialData.solution,
        reasoning: this.initialData.reasoning,
      });
      this.form.controls['snippets'].setValue(this.initialData.snippets);
      this.form.controls['tags'].setValue(this.initialData.tags);
    }
  }

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
      return this.form.markAllAsTouched();
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

    if (this.initialData) {
      this._episodeService.update(this.initialData, episode);
    } else {
      this._episodeService.add(episode);
    }

    this.saved.emit();

    if (!this.saved.observed) {
      this._router.navigate(['/stacks', this.form.value.stackId]);
    }
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
