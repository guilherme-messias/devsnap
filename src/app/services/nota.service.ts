import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotaService {
  notas: number[] = [8, 6, 9];

  adicionarNota(nota: number) {
    this.notas = [...this.notas, nota];
  }

  removerNota(nota: number) {
    this.notas = this.notas.filter((_, i) => i !== nota);
  }

  calcularTotal(): number {
    return this.notas.reduce((total, nota) => total + nota, 0);
  }
}
