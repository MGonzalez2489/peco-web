import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenDto } from '@auth/dto';
import { Store } from '@ngrx/store';
import { UiActions } from '@store/actions/ui.actions';
import { AppState } from '@store/reducers';
import { selectToken } from '@store/selectors';
import { catchError, delay, mergeMap, take, tap } from 'rxjs';

let isBusy = false;

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const store$ = inject(Store<AppState>);
  const requestDelay = 500;

  return store$.select(selectToken).pipe(
    take(1),
    tap(() => {
      if (!isBusy) {
        isBusy = true;
        store$.dispatch(UiActions.setBusyOn());
      }
    }),
    delay(requestDelay),
    mergeMap((token: TokenDto) => {
      if (token) {
        req = req.clone({
          headers: req.headers.append(
            'Authorization',
            `Bearer ${token.access_token}`,
          ),
        });
      }

      return next(req).pipe(
        tap(() => {
          if (isBusy) {
            store$.dispatch(UiActions.setBusyOff());
            isBusy = false;
          }
        }),
      );
    }),

    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';
      //TODO: Improve this error handler
      if (error.error && error.error instanceof Object) {
        errorMsg = error.error.message;
      } else {
        errorMsg = error.message;
      }
      // if (error.error instanceof ErrorEvent) {
      //   console.log('This is client side error');
      //   errorMsg = `Error: ${error.error.message}`;
      // } else {
      //   console.log('This is server side error');
      //   errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
      // }
      store$.dispatch(UiActions.setErrorMessage({ message: errorMsg }));
      // return throwError(errorMsg);

      throw error;
      // return of(req);
    }),
  );
};
