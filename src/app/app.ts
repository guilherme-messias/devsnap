import { Component, inject, OnInit, signal } from '@angular/core';
import { KeyboardShortcutService } from './core/services/keyboard-shortcut.service';

@Component({
  selector: 'app-root',
  imports: [],
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
