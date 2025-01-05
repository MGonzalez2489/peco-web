import { CanActivateFn, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export const AuthGuard: CanActivateFn = (
  route,
  state,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  return true;
  // return inject(AuthService).isAuthenticated()
  //   ? true
  //   : inject(Router).createUrlTree(['/auth']);
};
