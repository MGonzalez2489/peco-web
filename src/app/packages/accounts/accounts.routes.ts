import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./accounts.component').then((c) => c.AccountsComponent),
    data: { pageTitle: 'Cuentas', filterByPeriod: false },
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/create-account/create-account.component').then(
        (c) => c.CreateAccountComponent,
      ),
    data: { pageTitle: 'Crear cuenta', filterByPeriod: false },
  },
  {
    path: ':accountId',
    loadComponent: () =>
      import('./pages/detail-account/detail-account.component').then(
        (c) => c.DetailAccountComponent,
      ),
    data: { pageTitle: 'Detalles cuenta', filterByPeriod: false },
  },
  {
    path: ':accountId/edit',
    loadComponent: () =>
      import('./pages/edit-account/edit-account.component').then(
        (c) => c.EditAccountComponent,
      ),
    data: { pageTitle: 'Editar cuenta', filterByPeriod: false },
  },
  {
    path: ':accountId/delete',
    loadComponent: () =>
      import('./pages/delete-account/delete-account.component').then(
        (c) => c.DeleteAccountComponent,
      ),
    data: { pageTitle: 'Eliminar cuenta', filterByPeriod: false },
  },
];
