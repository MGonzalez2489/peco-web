import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./entries.component').then((c) => c.EntriesComponent),
    title: 'Registros',
    data: { pageTitle: 'Registros', filterByPeriod: true },
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/create-entry/create-entry.component').then(
        (c) => c.CreateEntryComponent,
      ),
    title: 'Crear Registro',
    data: { pageTitle: 'Crear Registro', filterByPeriod: false },
  },
  {
    path: 'new/:accountId',
    loadComponent: () =>
      import('./pages/create-entry/create-entry.component').then(
        (c) => c.CreateEntryComponent,
      ),
    title: 'Crear Registro',
    data: { pageTitle: 'Crear Registro', filterByPeriod: false },
  },
];
