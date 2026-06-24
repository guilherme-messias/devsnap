import { Component, inject, OnInit, signal } from '@angular/core';
import { KeyboardShortcutService } from './core/services/keyboard-shortcut.service';
import { RouterOutlet } from '../../node_modules/@angular/router/types/_router_module-chunk';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('meu-app');

  private readonly keyboardShortcutService: KeyboardShortcutService =
    inject(KeyboardShortcutService);

  ngOnInit(): void {
    this.keyboardShortcutService.init();
  }
}
