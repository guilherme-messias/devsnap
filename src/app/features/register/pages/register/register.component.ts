import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { form, required, email, minLength, pattern, FormField } from '@angular/forms/signals';

interface RegisterModel {
  name: string;
  email: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, FormField],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerModel = signal<RegisterModel>({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  isLoading = signal<boolean>(false);

  registerErrorMessage = signal<string>('');

  registerForm = form(this.registerModel, (fieldPath) => {
    required(fieldPath.name, { message: 'Nome é obrigatório' });

    required(fieldPath.email, { message: 'E-mail é obrigatório' });
    email(fieldPath.email, { message: 'E-mail inválido' });

    required(fieldPath.password, { message: 'Senha é obrigatória' });
    minLength(fieldPath.password, 8, { message: 'Senha deve ter pelo menos 8 caracteres' });
    pattern(fieldPath.password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, { message: 'Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial' });
  }
  );
}
