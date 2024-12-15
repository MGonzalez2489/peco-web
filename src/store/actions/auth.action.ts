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

//Register;
export const RegisterAction = createAction(
  AUTH_ACTIONS.REGISTER,
  props<{ params: SignInDto }>(),
);

export const RegisterSuccessAction = createAction(
  AUTH_ACTIONS.REGISTER_SUCCESS,
  props<{ token: TokenDto }>(),
);
export const RegisterFailedAction = createAction(
  AUTH_ACTIONS.REGISTER_FAIL,
  props<{ payload: any }>(),
);
