import { Routes } from '@angular/router';
import { FocusConfigComponent } from './pages/focus-config/focus-config.component';
import { FocusResultComponent } from './pages/focus-result/focus-result.component';
import { FocusSessionComponent } from './pages/focus-session/focus-session.component';

export const FOCUS_ROUTES: Routes = [
  {
    path: '',
    component: FocusConfigComponent,
  },
  {
    path: 'sessao',
    component: FocusSessionComponent,
  },
  {
    path: 'resultado',
    component: FocusResultComponent,
  },
];
