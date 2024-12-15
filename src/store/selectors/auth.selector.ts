import { createSelector } from '@ngrx/store';
import { AuthState } from '@store/states';
import { AppState } from '@store/states/app.state';

const authState = (state: AppState) => state.auth;

export const selectToken = createSelector(
  authState,
  (state: AuthState) => state.token,
);
