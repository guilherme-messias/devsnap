import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-playground-component',
  imports: [],
  templateUrl: './playground-component.html',
  styleUrl: './playground-component.css',
})
export class PlaygroundComponent {
  contador$ = new Observable<number>((subscriber) => {
    let valorAtual = 1;

    const id = setInterval(() => {
      subscriber.next(valorAtual);
      valorAtual++;

      if (valorAtual > 5) {
        subscriber.complete();
        clearInterval(id);
      }
    }, 1000);

    return () => {
      clearInterval(id);
    };
  });

  executando() {
    this.contador$.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('Completo!'),
    });
  }
}
