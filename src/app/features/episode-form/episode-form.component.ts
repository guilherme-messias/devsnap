import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-episode-form',
  standalone: true,
  templateUrl: './episode-form.component.html',
  imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
})
export class EpisodeFormComponent {
  form: FormGroup;

  private readonly _fb = inject(FormBuilder);

  constructor(_fb: FormBuilder) {
    this.form = this._fb.group({
      episodeData: this._fb.group({
        stackId: ['', Validators.required],
        title: ['', Validators.required],
        error: ['', Validators.required],
        attempts: ['', Validators.required],
        solution: ['', Validators.required],
        reasoning: ['', Validators.required],
      }),

      snippet: [''],
    });
  }
}
