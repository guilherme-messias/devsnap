import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard],
  },

  {
    path: 'onboarding',
    loadComponent: () =>
      import('./features/onboarding/onboarding.component').then((m) => m.OnboardingComponent),
  },

  {
    path: 'stacks/:id',
    loadComponent: () =>
      import('./features/stack-detail/stack-detail.component').then((m) => m.StackDetailComponent),
  },

  {
    path: 'stacks/:id/episodios/novo',
    loadComponent: () =>
      import('./features/episode-form/episode-form.component').then((m) => m.EpisodeFormComponent),
  },

  {
    path: 'stacks/:id/episodios/:eid',
    loadComponent: () =>
      import('./features/episode-detail/episode-detail.component').then(
        (m) => m.EpisodeDetailComponent,
      ),
  },

  {
    path: 'stacks/:id/episodios/:eid/editar',
    loadComponent: () =>
      import('./features/episode-edit/episode-edit.component').then((m) => m.EpisodeEditComponent),
  },

  {
    path: 'foco',
    loadComponent: () =>
      import('./features/focus/focus-config.component').then((m) => m.FocusConfigComponent),
  },

  {
    path: 'foco/sessao',
    loadComponent: () =>
      import('./features/focus/focus-session.component').then((m) => m.FocusSessionComponent),
  },

  {
    path: 'foco/resultado',
    loadComponent: () =>
      import('./features/focus/focus-result.component').then((m) => m.FocusResultComponent),
  },

  {
    path: 'configuracoes',
    loadComponent: () =>
      import('./features/settings/settings.component').then((m) => m.SettingsComponent),
  },

  {
    path: 'exportar',
    loadComponent: () =>
      import('./features/export/export.component').then((m) => m.ExportComponent),
  },
];
