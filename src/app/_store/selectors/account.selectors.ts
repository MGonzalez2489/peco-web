import { Account } from '@core/models/entities';
import { createSelector } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { AccountState } from '@store/reducers/account.reducer';

const accountsState = (state: AppState) => state.user.accounts;

export const selectAccounts = createSelector(
  accountsState,
  (state: AccountState) => state,
);

export const selectAccountById = (accountId: string) =>
  createSelector(accountsState, (state: AccountState) =>
    state.find((f: Account) => f.publicId == accountId),
  );
