import { Routes } from '@angular/router';
import { AuthGuard } from '@auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
  {
    path: '',
    loadChildren: () =>
      import('./packages/auth/auth.routes').then((m) => m.routes),
  },
  {
    path: '',
    loadComponent: () =>
      import('@shared/components/layout/main-page/main-page.component').then(
        (c) => c.MainPageComponent,
      ),
    children: [
      {
        path: 'home',
        loadChildren: () => import('@home/home.routes').then((c) => c.routes),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('@accounts/accounts.routes').then((c) => c.routes),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
      {
        path: 'entries',
        loadChildren: () =>
          import('@entries/entries.routes').then((c) => c.routes),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('@settings/settings.routes').then((c) => c.routes),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
      {
        path: 'planned-entries',
        loadChildren: () =>
          import('@planned-entries/planned-entries.routes').then(
            (c) => c.routes,
          ),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
    ],
  },
];
