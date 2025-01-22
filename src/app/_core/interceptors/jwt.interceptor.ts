import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { selectToken } from '@store/selectors';
import { take, mergeMap } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const store$ = inject(Store<AppState>);

  return store$.select(selectToken).pipe(
    take(1),
    mergeMap((token) => {
      if (token) {
        req = req.clone({
          headers: req.headers.append('Authorization', `Bearer ${token}`),
        });
      }
      return next(req);
    }),
  );
};
