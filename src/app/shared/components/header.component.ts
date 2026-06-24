import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  template: `
    <header
      class="sticky top-0 z-[100] flex items-center justify-between px-4 py-3 md:px-6"
      style="background: var(--color-bg-primary)"
    >
      <a routerLink="/home" class="flex shrink-0 items-center gap-2" aria-label="DevSnap — início">
        <img src="images/logo.svg" alt="" class="h-8 w-8" width="32" height="32" />
        <span
          class="text-lg font-semibold tracking-tight"
          style="color: var(--color-text-primary)"
        >
          DevSnap
        </span>
      </a>

      <div class="flex items-center gap-1">
        <a
          mat-icon-button
          routerLink="/configuracoes"
          aria-label="Configurações"
          style="color: var(--color-text-secondary)"
        >
          <mat-icon>settings</mat-icon>
        </a>

        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
          style="background: var(--color-bg-surface); color: var(--color-text-secondary)"
          role="img"
          aria-label="Avatar do usuário"
        >
          <mat-icon>person</mat-icon>
        </div>
      </div>
    </header>
  `,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
