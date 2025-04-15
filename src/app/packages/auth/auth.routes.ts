import { Routes } from '@angular/router';
export enum AuthRoutesEnum {
  LOGIN = 'login',
  REGISTER = 'register',
}

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./auth.component').then((c) => c.AuthComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: AuthRoutesEnum.LOGIN,
      },
      {
        path: AuthRoutesEnum.LOGIN,
        loadComponent: () =>
          import('./pages/login/login.component').then((c) => c.LoginComponent),
        data: { pageTitle: 'Login', filterByPeriod: true },
      },
      {
        path: AuthRoutesEnum.REGISTER,
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (c) => c.RegisterComponent,
          ),
        data: { pageTitle: 'Registrar', filterByPeriod: true },
      },
    ],
  },
];
