import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './../actions/auth.actions';

export interface AuthState {
  token: string | null;
}

export const initialState: AuthState = {
  token: null,
};

export const AuthReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { data }) => ({
    ...state,
    token: data.access_token,
  })),
);
