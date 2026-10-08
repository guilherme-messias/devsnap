import { Component, signal } from '@angular/core';
import { email, form, minLength, pattern, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface LoginModel {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginModel = signal<LoginModel>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.email, { message: 'E-mail é obrigatório' });
    email(fieldPath.email, { message: 'E-mail inválido' });

    required(fieldPath.password, { message: 'Senha é obrigatória' });
    minLength(fieldPath.password, 8, { message: 'Senha deve ter pelo menos 8 caracteres' });
    pattern(fieldPath.password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, { message: 'Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial' });
  });
}
