import { Account } from '@core/models/entities';
import { createReducer, on } from '@ngrx/store';
import { AccountActions } from '@store/actions/account.actions';

export const accountFeatureKey = 'account';

export interface AccountState {
  data: Account[];
}

const initialState: AccountState = {
  data: [],
};

export const AccountReducer = createReducer(
  initialState,

  on(AccountActions.loadAccountsSuccess, (state, { accounts }) => {
    return { ...state, data: accounts };
  }),

  on(AccountActions.createSuccess, (state, { account }) => {
    return {
      ...state,
      data: [account, ...state.data],
    };
  }),
  on(AccountActions.updateSuccess, (state, { account }) => {
    const accounts = state.data.map((acc) => {
      if (acc.publicId === account.publicId) {
        return {
          ...acc,
          name: account.name,
          isDefault: account.isDefault,
          type: account.type,
        };
      }
      return acc;
    });
    return {
      ...state,
      data: accounts,
    };
  }),
  on(AccountActions.getByIdSuccess, (state, { account }) => {
    const accounts = state.data.map((acc) => {
      if (acc.publicId === account.publicId) {
        return account;
      }
      return acc;
    });
    return {
      ...state,
      data: accounts,
    };
  }),

  on(AccountActions.deleteSuccess, (state, { accountId }) => {
    const accounts = state.data.filter((f) => f.publicId !== accountId);
    return {
      ...state,
      data: accounts,
    };
  }),
);
