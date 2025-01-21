import { inject, Injectable } from '@angular/core';
import { AuthService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '@store/actions/auth.actions';
import { exhaustMap, map } from 'rxjs';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  constructor() {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) =>
        this.authService
          .login(action.data)
          .pipe(
            map((result) => AuthActions.loginSuccess({ data: result.data })),
          ),
      ),
    );
  });

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap((action) =>
        this.authService
          .register(action.data)
          .pipe(
            map((result) => AuthActions.registerSuccess({ data: result.data })),
          ),
      ),
    );
  });
}
