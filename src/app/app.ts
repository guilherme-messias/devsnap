import { Component, signal } from '@angular/core';
import { NotaComponent } from './nota-component/nota-component';

@Component({
  selector: 'app-root',
  imports: [NotaComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('meu-app');
}
