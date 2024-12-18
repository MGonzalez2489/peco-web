import { AccountState } from '@store/states';
import { createRehydrateReducer } from './_rehydrateReducer';
import { FEATURE_NAME } from '@store/constants';
import * as AccountActionsGroup from './../actions/account.action';
import { on } from '@ngrx/store';

const initialState: AccountState = {
  accounts: [],
};

const _accountReducer = createRehydrateReducer(
  FEATURE_NAME.ACCOUNT,
  initialState,
  //GET ALL
  on(AccountActionsGroup.GetAllAccountsAction, (state) => {
    return state;
  }),
  on(AccountActionsGroup.GetAllAccountsSuccessAction, (state, { accounts }) => {
    return {
      ...state,
      accounts,
    };
  }),
  on(AccountActionsGroup.GetAllAccountsFailAction, (state, { payload }) => {
    return state;
  }),
  //GET BY ID

  on(AccountActionsGroup.GetAccountByIdAction, (state) => {
    return state;
  }),
  on(AccountActionsGroup.GetAccountByIdSuccessAction, (state, { account }) => {
    const accs = state.accounts.filter((f) => f.publicId !== account.publicId);
    accs.push(account);

    return {
      ...state,
      accounts: accs,
    };
  }),
  on(AccountActionsGroup.GetAllAccountsFailAction, (state, { payload }) => {
    return state;
  }),
  //CREATE
  on(AccountActionsGroup.CreateAccountAction, (state) => {
    return state;
  }),
  on(AccountActionsGroup.CreateAccounSuccesstAction, (state, { account }) => {
    return {
      ...state,
      accounts: [account, ...state.accounts],
    };
  }),
  on(AccountActionsGroup.GetAllAccountsFailAction, (state, { payload }) => {
    return state;
  }),
);

export function AccountReducer(state: any, action: any) {
  return _accountReducer(state, action);
}
