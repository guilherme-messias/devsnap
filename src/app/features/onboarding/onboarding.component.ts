import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { StackService } from '../../core/services/stack.service';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

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
  private readonly _stackService: StackService = inject(StackService);
  private readonly _router: Router = inject(Router);
  readonly form = new FormGroup({
    name: new FormControl<string>(''),
  });

  createStack(): void {
    this._stackService.add({
      id: uuidv4(),
      name: this.form.get('name')?.value || '',
      createdAt: new Date(),
    });
    this._router.navigate(['/stacks', this._stackService.stacks().at(-1)?.id]);
  }
}
