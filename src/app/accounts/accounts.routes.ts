import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./accounts.component').then((c) => c.AccountsComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/create-account/create-account.component').then(
        (c) => c.CreateAccountComponent,
      ),
  },
];
