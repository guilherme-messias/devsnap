import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { StackApiService } from '@app/core/services/stack-api.service';
import { StackService } from '@app/core/services/stack.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-onboarding',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss',
})
export class OnboardingComponent {
  private readonly _stackApiService: StackApiService = inject(StackApiService);
  private readonly _router: Router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);

  readonly form = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  errorMessage = signal<string>('');

  createStack(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const stackName = this.form.controls.name.value.trim();

    this._stackApiService
      .createStack(stackName)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (response) => {
          this._router.navigate(['/stacks', response.id]);
        },
        error: (error: { error?: { message?: string } }) => {
          this.errorMessage.set(
            error?.error?.message ?? 'Não foi possível criar a stack. Tente novamente.',
          );
        },
      });
  }
}
