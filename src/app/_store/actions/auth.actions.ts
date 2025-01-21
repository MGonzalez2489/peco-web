import { LoginDto, TokenDto } from '@core/models/dtos';
import { createActionGroup, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    //Login
    Login: props<{ data: LoginDto }>(),
    'Login Success': props<{ data: TokenDto }>(),
    'Login Failure': props<{ payload: any }>(),
    //Register
    Register: props<{ data: LoginDto }>(),
    'Register Success': props<{ data: TokenDto }>(),
    'Register Failure': props<{ payload: any }>(),
  },
});
