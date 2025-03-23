import { LoginDto } from '@auth/dto/login.dto';
import { TokenDto } from '@auth/dto/token.dto';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    //Login
    Login: props<{ data: LoginDto }>(),
    'Login Success': props<{ data: TokenDto }>(),
    'Login Failure': props<{ payload: never }>(),
    //Register
    Register: props<{ data: LoginDto }>(),
    'Register Success': props<{ data: TokenDto }>(),
    'Register Failure': props<{ payload: never }>(),

    //Logout
    Logout: emptyProps(),
  },
});
