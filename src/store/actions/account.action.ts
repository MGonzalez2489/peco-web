import { createAction, props } from '@ngrx/store';
import { Account } from '@core/models/api';
import { AccountDto } from '@core/models/dtos';

enum ACCOUNT_ACTIONS {
  GET = '[ACCOUNT] Get All Accounts',
  GET_SUCCESS = '[ACCOUNT] Get All Accounts Success',
  GET_FAIL = '[ACCOUNT] Get All Accounts Fail',

  CREATE = '[Account] Create Account',
  CREATE_SUCCESS = '[Account] Create Account Success',
  CREATE_FAIL = '[Account] Create Account Fail',
}
//Get
export const GetAllAccountsAction = createAction(ACCOUNT_ACTIONS.GET);
export const GetAllAccountsSuccessAction = createAction(
  ACCOUNT_ACTIONS.GET_SUCCESS,
  props<{ accounts: Account[] }>(),
);
export const GetAllAccountsFailAction = createAction(
  ACCOUNT_ACTIONS.GET_FAIL,
  props<{ payload: any }>(),
);
//create
export const CreateAccountAction = createAction(
  ACCOUNT_ACTIONS.CREATE,
  props<{ accountDto: AccountDto }>(),
);
export const CreateAccounSuccesstAction = createAction(
  ACCOUNT_ACTIONS.CREATE_SUCCESS,
  props<{ account: Account }>(),
);
export const CreateAccountFailAction = createAction(
  ACCOUNT_ACTIONS.CREATE_FAIL,
  props<{ payload: any }>(),
);
