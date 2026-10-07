import { Routes } from '@angular/router';
import { authGuard } from '@app/core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./features/home').then((m) => m.HOME_ROUTES),
      },
      {
        path: 'stacks/:id/episodios/novo',
        loadChildren: () => import('./features/episode-form').then((m) => m.EPISODE_FORM_ROUTES),
      },
      {
        path: 'stacks/:id/episodios/:eid/editar',
        loadChildren: () => import('./features/episode-edit').then((m) => m.EPISODE_EDIT_ROUTES),
      },
      {
        path: 'stacks/:id/episodios/:eid',
        loadChildren: () =>
          import('./features/episode-detail').then((m) => m.EPISODE_DETAIL_ROUTES),
      },
      {
        path: 'stacks/:id',
        loadChildren: () => import('./features/stack-detail').then((m) => m.STACK_DETAIL_ROUTES),
      },
      {
        path: 'foco',
        loadChildren: () => import('./features/focus').then((m) => m.FOCUS_ROUTES),
      },
      {
        path: 'configuracoes',
        loadChildren: () => import('./features/settings').then((m) => m.SETTINGS_ROUTES),
      },
      {
        path: 'exportar',
        loadChildren: () => import('./features/export').then((m) => m.EXPORT_ROUTES),
      },
    ],
  },

  {
    path: 'onboarding',
    canActivate: [authGuard],
    loadChildren: () => import('./features/onboarding').then((m) => m.ONBOARDING_ROUTES),
  },
];
