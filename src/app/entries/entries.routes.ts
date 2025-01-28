import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./entries.component').then((c) => c.EntriesComponent),
    title: 'Registros',
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/create-entry/create-entry.component').then(
        (c) => c.CreateEntryComponent,
      ),
    title: 'Crear Registro',
  },
];
