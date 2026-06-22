import { Component, signal } from '@angular/core';
import { PainelComponent } from './painel-component/painel-component';

@Component({
  selector: 'app-root',
  imports: [PainelComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('meu-app');
}
