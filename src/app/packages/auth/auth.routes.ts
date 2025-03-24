import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./auth.component').then((c) => c.AuthComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((c) => c.LoginComponent),
        title: 'Login',
      },
      {
        path: 'registrar',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (c) => c.RegisterComponent,
          ),
        title: 'Crear Cuenta',
      },
    ],
  },
];
