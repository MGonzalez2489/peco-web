import { LoginDto } from '@core/models/dtos';
import { createActionGroup, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ data: LoginDto }>(),
    'Login Success': props<{ data: LoginDto }>(),
    'Login Failure': props<{ payload: any }>(),
  },
});
