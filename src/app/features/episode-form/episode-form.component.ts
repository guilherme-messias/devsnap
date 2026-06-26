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

  tags = signal<string[]>([]);
  currentTag = signal<string>('');

  private readonly _stackService = inject(StackService);
  readonly stacks = this._stackService.stacks;

  readonly separatorKeysCodes = [ENTER, COMMA];

  private readonly _fb = inject(FormBuilder);

  constructor(_fb: FormBuilder) {
    this.form = this._fb.group({
      stackId: ['', Validators.required],
      episodeData: this._fb.group({
        title: ['', Validators.required],
        error: ['', Validators.required],
        attempts: ['', Validators.required],
        solution: ['', Validators.required],
        reasoning: ['', Validators.required],
      }),
      snippet: [''],
    });
  }

  addTag(event: MatChipInputEvent): void {
    const value = event.value.trim();
    if (value) {
      this.tags.update((tags) => [...tags, value]);
    }
    this.currentTag.set('');
  }

  removeTag(tag: string): void {
    this.tags.update((tags) => tags.filter((t) => t !== tag));
  }
}
