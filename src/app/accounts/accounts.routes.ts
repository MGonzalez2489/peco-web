import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./accounts.component').then((c) => c.AccountsComponent),
    title: 'Cuentas',
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/create-account/create-account.component').then(
        (c) => c.CreateAccountComponent,
      ),
    title: 'Crear Cuenta',
  },
  {
    path: ':accountId',
    loadComponent: () =>
      import('./pages/detail-account/detail-account.component').then(
        (c) => c.DetailAccountComponent,
      ),
    title: 'View Cuenta',
  },
  {
    path: ':accountId/edit',
    loadComponent: () =>
      import('./pages/edit-account/edit-account.component').then(
        (c) => c.EditAccountComponent,
      ),
    title: 'Editar Cuenta',
  },
  {
    path: ':accountId/delete',
    loadComponent: () =>
      import('./pages/delete-account/delete-account.component').then(
        (c) => c.DeleteAccountComponent,
      ),
    title: 'Eliminar Cuenta',
  },
];
