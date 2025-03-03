import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '@store/actions/auth.actions';

export interface AuthState {
  token: string | null;
  expiresAt: string | null;
}

export const initialState: AuthState = {
  token: null,
  expiresAt: null,
};

export const AuthReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { data }) => ({
    ...state,
    token: data.access_token,
    expiresAt: data.expiresAt,
  })),
  on(AuthActions.registerSuccess, (state, { data }) => ({
    ...state,
    token: data.access_token,
    expiresAt: data.expiresAt,
  })),
);
