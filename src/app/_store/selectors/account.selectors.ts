import { createSelector } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { AccountState } from '@store/reducers/account.reducer';

const accountsState = (state: AppState) => state.accounts;

export const selectAccounts = createSelector(
  accountsState,
  (state: AccountState) => state.accounts,
);
