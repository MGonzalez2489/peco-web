import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignInDto, TokenDto } from '@core/models/dtos';
import { ResultModel } from '@core/models/responses';
import { AuthService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  LogoutActions,
  LogoutSuccessActions,
  RegisterAction,
  RegisterFailedAction,
  RegisterSuccessAction,
  SigninAction,
  SigninFailedAction,
  SigninSuccessAction,
} from '@store/actions/auth.action';
import { mergeMap, map, catchError, of, tap } from 'rxjs';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor() {}
  //signin
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SigninAction),
      mergeMap((data: { params: SignInDto }) => {
        return this.authService.signIn(data.params).pipe(
          map((response: ResultModel<TokenDto>) => {
            this.authService.isAuthenticated.set(true);
            return SigninSuccessAction({ token: response.data });
          }),
          catchError((err) => {
            return of(SigninFailedAction({ payload: err }));
          }),
        );
      }),
    ),
  );
  //register
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterAction),
      mergeMap((data: { params: SignInDto }) => {
        return this.authService.register(data.params).pipe(
          map((response: ResultModel<TokenDto>) => {
            this.authService.isAuthenticated.set(true);

            return RegisterSuccessAction({ token: response.data });
          }),
          catchError((err) => {
            return of(RegisterFailedAction({ payload: err }));
          }),
        );
      }),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LogoutActions),
      tap(() => {
        this.authService.isAuthenticated.set(false);
        this.router.navigate(['/auth']);
        localStorage.clear();
      }),
      map(() => {
        return LogoutSuccessActions();
      }),
    ),
  );
}
