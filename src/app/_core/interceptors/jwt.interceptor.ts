import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogoutAction } from '@store/actions/auth.action';
import { selectToken } from '@store/selectors';
import { AppState } from '@store/states';
import { catchError, mergeMap, take, throwError } from 'rxjs';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const store$ = inject(Store<AppState>);

  return store$.select(selectToken).pipe(
    take(1),
    mergeMap((token) => {
      if (token) {
        req = req.clone({
          headers: req.headers.append('Authorization', `Bearer ${token}`),
        });
      }
      return next(req).pipe(
        catchError((err) => {
          // if ([401, 403].includes(err.status)) {
          //   alert('expired session');
          //   store$.dispatch(LogoutAction());
          // }
          return throwError(() => err);
        }),
      );
    }),
  );
};
