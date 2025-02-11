import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '@store/actions/auth.actions';

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
  on(AuthActions.registerSuccess, (state, { data }) => ({
    ...state,
    token: data.access_token,
  })),
);
