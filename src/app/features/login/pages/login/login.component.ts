import { Component, signal, DestroyRef, inject } from '@angular/core';
import { email, form, minLength, pattern, required, FormField } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserApiService } from '../../../../core/services/user-api.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface LoginModel {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormField],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly _userApi = inject(UserApiService);
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);


  loginModel = signal<LoginModel>({
    email: '',
    password: '',
  });
  isLoading = signal<boolean>(false);

  loginErrorMessage = signal<string>('');

  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.email, { message: 'E-mail é obrigatório' });
    email(fieldPath.email, { message: 'E-mail inválido' });

    required(fieldPath.password, { message: 'Senha é obrigatória' });
    minLength(fieldPath.password, 8, { message: 'Senha deve ter pelo menos 8 caracteres' });
    pattern(fieldPath.password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, { message: 'Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial' });
  });

  login() {
    if (this.loginForm().invalid()) {
      this.loginForm().markAsTouched();
      return;
    }

    this.loginErrorMessage.set('');
    this.isLoading.set(true);

    const { email, password } = this.loginModel();
    this._userApi.login(email, password).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: () => {
        this._router.navigate(['/']);
      },
      error: (error: { error?: { message?: string } }) => {
        this.isLoading.set(false);
        this.loginErrorMessage.set(
          error?.error?.message ?? 'Não foi possível entrar. Tente novamente.',
        );
      },
    });
  }
}
