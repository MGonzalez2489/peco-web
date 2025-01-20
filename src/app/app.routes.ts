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
    path: 'home',
    loadComponent: () =>
      import('@shared/components/layout/main-page/main-page.component').then(
        (c) => c.MainPageComponent,
      ),
    loadChildren: () => import('./home/home.routes').then((m) => m.routes),
  },
];
