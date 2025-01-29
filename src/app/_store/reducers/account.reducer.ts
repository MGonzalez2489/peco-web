import { createReducer, on } from '@ngrx/store';
import { Account } from '@core/models/entities';
import { AccountActions } from '@store/actions/account.actions';

export const accountFeatureKey = 'account';

export type AccountState = Account[];

export const initialState: AccountState = [];
export const AccountReducer = createReducer(
  initialState,
  on(AccountActions.loadAccountsSuccess, (state, { data }) => {
    return data;
  }),

  on(AccountActions.createSuccess, (state, { data }) => {
    const newState = [data, ...state];
    return newState;
  }),
  on(AccountActions.updateSuccess, (state, { data }) => {
    const accounts = state.map((acc) => {
      if (acc.publicId === data.publicId) {
        return { ...acc, name: data.name, isDefault: data.isDefault };
      }
      return acc;
    });
    return accounts;
  }),

  on(AccountActions.deleteSuccess, (state, { accountId }) => {
    const accounts = state.filter((f) => f.publicId !== accountId);
    return accounts;
  }),
);
