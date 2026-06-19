import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotaService {
  notas: number[] = [8, 6, 9];

  adicionar(nota: number) {
    this.notas.push(nota);
  }

  media(): number {
    const soma = this.notas.reduce((acc, n) => acc + n, 0);
    return soma / this.notas.length;
  }
}
