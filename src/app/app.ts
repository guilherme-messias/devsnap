import { Component, inject, OnInit, signal } from '@angular/core';
import { KeyboardShortcutService } from './core/services/keyboard-shortcut.service';
import { HeaderComponent } from './shared/components/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
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
