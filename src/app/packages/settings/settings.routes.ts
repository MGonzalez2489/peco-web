import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./settings.component').then((c) => c.SettingsComponent),
    title: 'Configuracion',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'profile' },
      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile.component').then((c) => c.ProfileComponent),
        data: { pageTitle: 'Perfil', filterByPeriod: false },
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./entry-category/categories.component').then(
            (c) => c.CategoriesComponent,
          ),
        data: { pageTitle: 'Categorias', filterByPeriod: false },
      },
    ],
  },
];
