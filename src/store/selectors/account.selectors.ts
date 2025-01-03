import { Account } from '@core/models/api';
import { createSelector } from '@ngrx/store';
import { AppState, UserState } from '@store/states';

const userState = (state: AppState) => state.user;

export const selectAccounts = createSelector(
  userState,
  (state: UserState) => state.accounts,
);

export const selectAccountById = (accountId: string) =>
  createSelector(userState, (state: UserState) =>
    state.accounts.find((f: Account) => f.publicId == accountId),
  );
