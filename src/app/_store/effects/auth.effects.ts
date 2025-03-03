import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '@store/actions/auth.actions';
import { exhaustMap, map, tap } from 'rxjs';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

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

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.router.navigateByUrl('/login');
        }),
      );
    },
    { dispatch: false },
  );
}
