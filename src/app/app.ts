import { Component, inject, OnInit, signal } from '@angular/core';
import { KeyboardShortcutService } from './core/services/keyboard-shortcut.service';
import { HeaderComponent } from './shared/components/header.component';
import { FabCaptureComponent } from './shared/components/fab-capture.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FabCaptureComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('meu-app');

  private readonly keyboardShortcutService: KeyboardShortcutService =
    inject(KeyboardShortcutService);
  private readonly router: Router = inject(Router);
  private readonly hiddenRoutes = ['/foco/sessao', '/foco/resultado'];

  ngOnInit(): void {
    this.keyboardShortcutService.init();
  }

  fabHidden = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => this.hiddenRoutes.some((r) => (e as NavigationEnd).url.startsWith(r))),
    ),
    { initialValue: false },
  );
}
