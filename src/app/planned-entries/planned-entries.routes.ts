import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./planned-entries.component').then(
        (c) => c.PlannedEntriesComponent,
      ),
    title: 'Planear registros',
  },
];
