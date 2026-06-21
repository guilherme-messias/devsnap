import { Component, signal } from '@angular/core';
import { PlaygroundComponent } from "./playground-component/playground-component";

@Component({
  selector: 'app-root',
  imports: [PlaygroundComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('meu-app');
}
