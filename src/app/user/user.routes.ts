import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./user.component').then((c) => c.UserComponent),
    title: 'Perfil',
    children: [
      { path: '', pathMatch: 'full', redirectTo: '' },
      {
        path: '',
        loadComponent: () =>
          import('./components/profile/profile.component').then(
            (c) => c.ProfileComponent,
          ),
      },
      {
        path: 'edit',
        loadComponent: () =>
          import('./components/profile-form/profile-form.component').then(
            (c) => c.ProfileFormComponent,
          ),
      },
    ],
  },
];
