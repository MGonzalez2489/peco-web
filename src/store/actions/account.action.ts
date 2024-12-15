import { createAction, props } from '@ngrx/store';
import { Account } from '@core/models/api';

enum ACCOUNT_ACTIONS {
  GET = '[ACCOUNT] Get All Accounts',
  GET_SUCCESS = '[ACCOUNT] Get All Accounts Success',
  GET_FAIL = '[ACCOUNT] Get All Accounts Fail',
}

export const GetAllAccountsAction = createAction(ACCOUNT_ACTIONS.GET);
export const GetAllAccountsSuccessAction = createAction(
  ACCOUNT_ACTIONS.GET_SUCCESS,
  props<{ accounts: Account[] }>(),
);
export const GetAllAccountsFailAction = createAction(
  ACCOUNT_ACTIONS.GET_FAIL,
  props<{ payload: any }>(),
);
