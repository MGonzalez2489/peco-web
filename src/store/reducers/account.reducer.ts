import { createRehydrateReducer } from './_rehydrateReducer';
import { FEATURE_NAME } from '@store/constants';
import * as AccountActionsGroup from './../actions/account.action';
import { on } from '@ngrx/store';
import { Account } from '@core/models/api';

const initialState: Account[] = [];

const _accountReducer = createRehydrateReducer(
  FEATURE_NAME.ACCOUNT,
  initialState,
  //GET ALL
  on(AccountActionsGroup.GetAllAccountsAction, (state) => {
    return state;
  }),
  on(AccountActionsGroup.GetAllAccountsSuccessAction, (state, { accounts }) => {
    return accounts;
  }),
  on(AccountActionsGroup.GetAllAccountsFailAction, (state, { payload }) => {
    return state;
  }),
  //GET BY ID

  on(AccountActionsGroup.GetAccountByIdAction, (state) => {
    return state;
  }),
  on(AccountActionsGroup.GetAccountByIdSuccessAction, (state, { account }) => {
    const accs = state.filter((f) => f.publicId !== account.publicId);
    accs.push(account);

    return accs;
  }),
  on(AccountActionsGroup.GetAllAccountsFailAction, (state, { payload }) => {
    return state;
  }),
  //CREATE
  on(AccountActionsGroup.CreateAccountAction, (state) => {
    return state;
  }),
  on(AccountActionsGroup.CreateAccounSuccesstAction, (state, { account }) => {
    const newState = [account, ...state];
    return newState;
  }),
  on(AccountActionsGroup.GetAllAccountsFailAction, (state, { payload }) => {
    return state;
  }),
);

export function AccountReducer(state: any, action: any) {
  return _accountReducer(state, action);
}
