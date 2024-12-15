import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectToken } from '@store/selectors';
import { AppState } from '@store/states';
import { mergeMap, take } from 'rxjs';

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
      return next(req);
    }),
  );
};
