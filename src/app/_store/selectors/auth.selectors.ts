import { createSelector } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { AuthState } from '@store/reducers/session/auth.reducer';

const authState = (state: AppState) => state.auth;

export const selectToken = createSelector(
  authState,
  (state: AuthState) => state.token,
);
