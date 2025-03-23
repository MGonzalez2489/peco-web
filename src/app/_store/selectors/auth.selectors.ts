import { TokenDto } from '@auth/dto/token.dto';
import { createSelector } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { AuthState } from '@store/reducers/session/auth.reducer';

const authState = (state: AppState) => state.session.auth;

export const selectToken = createSelector(authState, (state: AuthState) => {
  const value: TokenDto = {
    access_token: state.token!,
    expiresAt: state.expiresAt!,
  };
  return value;
});
