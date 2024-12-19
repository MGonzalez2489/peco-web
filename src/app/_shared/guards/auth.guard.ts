import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '@core/services';
import { Observable } from 'rxjs';

export const AuthGuard: CanActivateFn = (
  route,
  state,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const isAuth = inject(AuthService).isAuthenticated;
  return inject(AuthService).isAuthenticated()
    ? true
    : inject(Router).createUrlTree(['/auth']);
};
