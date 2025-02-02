import { createSelector } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { IdentityState } from '@store/reducers/identity.reducer';

const identityState = (state: AppState) => state.user?.identity;

export const selectIdentity = createSelector(
  identityState,
  (state: IdentityState) => state,
);
