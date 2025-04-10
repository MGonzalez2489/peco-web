import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'loading',
  },

  {
    path: 'loading',
    loadComponent: () =>
      import('./loading-session/loading-session.component').then(
        (c) => c.LoadingSessionComponent,
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then((c) => c.AboutComponent),
    data: { pageTitle: 'About', filterByPeriod: false },
  },
];
