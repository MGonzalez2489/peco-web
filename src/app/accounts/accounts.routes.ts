import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./accounts.component').then((c) => c.AccountsComponent),
  },
];
