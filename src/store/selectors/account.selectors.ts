import { createSelector } from '@ngrx/store';
import { AccountState, AppState } from '@store/states';

const accountState = (state: AppState) => state.account;

export const selectAccounts = createSelector(
  accountState,
  (state: AccountState) => state.accounts,
);
