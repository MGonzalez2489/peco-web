import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.routes),
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
        loadChildren: () => import('./home/home.routes').then((c) => c.routes),
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('./accounts/accounts.routes').then((c) => c.routes),
      },
    ],
  },
];
