import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./settings.component').then((c) => c.SettingsComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: '' },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(
            (c) => c.ProfileComponent,
          ),
        title: 'Perfil',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then(
            (c) => c.CategoriesComponent,
          ),
        title: 'Categorias',
      },
    ],
  },
];
