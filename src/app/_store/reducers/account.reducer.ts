import { createReducer, on } from '@ngrx/store';
import { Account } from '@core/models/entities';
import { AccountActions } from '@store/actions/account.actions';

export const accountFeatureKey = 'account';

export type AccountState = Account[];

export const initialState: AccountState = [];

export const AccountReducer = createReducer(
  initialState,
  on(AccountActions.loadAccountsSuccess, (state, { data }) => data),
);
