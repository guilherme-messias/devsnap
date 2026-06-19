import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from "./components/app-component/app-component";

export type Pessoas = {
  id: string;
  nome: string;
  endereco?: {
    rua: string;
    numero: number;
  };
};

@Component({
  selector: 'app-aula',
  imports: [FormsModule, AppComponent],
  templateUrl: './aula.html',
  styleUrl: './aula.css',
})
export class Aula {
  pessoas: Pessoas[] = [
    { id: '1', nome: 'Joao' },
    { id: '2', nome: 'Iara', endereco: { rua: 'teste', numero: 34 } },
    { id: '3', nome: 'Patrick' },
  ];

  retornarPessoas() {
    return this.pessoas;
  }
}
