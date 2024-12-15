import { inject, Injectable } from '@angular/core';
import { SignInDto, TokenDto } from '@core/models/dtos';
import { ResultModel } from '@core/models/responses';
import { AuthService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  RegisterAction,
  RegisterFailedAction,
  RegisterSuccessAction,
  SigninAction,
  SigninFailedAction,
  SigninSuccessAction,
} from '@store/actions/auth.action';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  constructor() {}
  //signin
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SigninAction),
      mergeMap((data: { params: SignInDto }) => {
        return this.authService.signIn(data.params).pipe(
          map((response: ResultModel<TokenDto>) => {
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
            return RegisterSuccessAction({ token: response.data });
          }),
          catchError((err) => {
            return of(RegisterFailedAction({ payload: err }));
          }),
        );
      }),
    ),
  );
}
