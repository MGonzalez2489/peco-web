import { Account } from '@core/models/entities';
import { createSelector } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { SessionState } from '@store/reducers/session';

const accountsState = (state: AppState) => state.session;

export const selectAccounts = createSelector(
  accountsState,
  (state: SessionState) => state.accounts.data,
);

export const selectAccountById = (accountId: string) =>
  createSelector(accountsState, (state: SessionState) =>
    state.accounts.data.find((f: Account) => f.publicId == accountId),
  );
