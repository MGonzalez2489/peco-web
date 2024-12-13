import { SignInDto, TokenDto } from '@core/models/dtos';
import { createAction, props } from '@ngrx/store';

enum AUTH_ACTIONS {
  SIGNIN = '[AUTH] Signin',
  SIGNIN_SUCCESS = '[AUTH] Signin SUCCESS',
  SIGNIN_FAIL = '[AUTH] Signin Fail',

  REGISTER = '[AUTH] Register',
  REGISTER_SUCCESS = '[AUTH] Register Success',
  REGISTER_FAIL = '[AUTH] Register Fail',
}

//Signin
export const SigninAction = createAction(
  AUTH_ACTIONS.SIGNIN,
  props<{ params: SignInDto }>(),
);

export const SigninSuccessAction = createAction(
  AUTH_ACTIONS.SIGNIN_SUCCESS,
  props<{ token: TokenDto }>(),
);
export const SigninFailedAction = createAction(
  AUTH_ACTIONS.SIGNIN_FAIL,
  props<{ payload: any }>(),
);

// export type AuthActionsGroup =
//   | typeof SigninAction
//   | typeof SigninSuccessAction
//   | typeof SigninFailedAction;

//Register
// export const LoginAction = createAction(
//   AUTH_ACTIONS.LOGIN,
//   props<{ params: ILogin }>(),
// );
//
// export const LoginSuccessAction = createAction(
//   AUTH_ACTIONS.LOGIN_SUCCESS,
//   props<{ token: string }>(),
// );
// export const LoginFailedAction = createAction(
//   AUTH_ACTIONS.LOGIN_FAIL,
//   props<{ payload: any }>(),
// );
