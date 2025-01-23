import { createReducer, on } from '@ngrx/store';
import { Account } from '@core/models/entities';
import { AccountActions } from '@store/actions/account.actions';

export const accountFeatureKey = 'account';

export interface AccountState {
  accounts: Account[];
}

export const initialState: AccountState = {
  accounts: [],
};

export const AccountReducer = createReducer(
  initialState,
  on(AccountActions.loadAccountsSuccess, (state, { data }) => ({
    ...state,
    accounts: data,
  })),

  on(AccountActions.createSuccess, (state, { data }) => ({
    ...state,
    accounts: [data, ...state.accounts],
  })),
);
