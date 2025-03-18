import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./planned-entries.component').then(
        (c) => c.PlannedEntriesComponent,
      ),
    children: [
      { path: '', pathMatch: 'full', redirectTo: '' },
      {
        path: '',
        loadComponent: () =>
          import(
            './pages/list-planned-entry/list-planned-entry.component'
          ).then((c) => c.ListPlannedEntryComponent),
        title: 'Planned Entries',
      },
      {
        path: 'new',
        loadComponent: () =>
          import(
            './pages/create-planned-entry/create-planned-entry.component'
          ).then((c) => c.CreatePlannedEntryComponent),
        title: 'New',
      },
    ],
  },
];
