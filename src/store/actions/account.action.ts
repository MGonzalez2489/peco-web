import { createAction, props } from '@ngrx/store';
import { Account } from '@core/models/api';
import { AccountDto } from '@core/models/dtos';

enum ACCOUNT_ACTIONS {
  GET = '[ACCOUNT] Get All Accounts',
  GET_SUCCESS = '[ACCOUNT] Get All Accounts Success',
  GET_FAIL = '[ACCOUNT] Get All Accounts Fail',

  GET_BY_ID = '[ACCOUNT] Get Account By Id',
  GET_BY_ID_SUCCESS = '[ACCOUNT] Get Account By Id Success',
  GET_BY_ID_FAIL = '[ACCOUNT] Get Account By Id Fail',

  CREATE = '[Account] Create Account',
  CREATE_SUCCESS = '[Account] Create Account Success',
  CREATE_FAIL = '[Account] Create Account Fail',

  CLEAR_STATE = '[Account] Clear State',
}
//Get All
export const GetAllAccountsAction = createAction(ACCOUNT_ACTIONS.GET);
export const GetAllAccountsSuccessAction = createAction(
  ACCOUNT_ACTIONS.GET_SUCCESS,
  props<{ accounts: Account[] }>(),
);
export const GetAllAccountsFailAction = createAction(
  ACCOUNT_ACTIONS.GET_FAIL,
  props<{ payload: any }>(),
);
//Get by id
export const GetAccountByIdAction = createAction(
  ACCOUNT_ACTIONS.GET_BY_ID,
  props<{ accountId: string }>(),
);
export const GetAccountByIdSuccessAction = createAction(
  ACCOUNT_ACTIONS.GET_BY_ID_SUCCESS,
  props<{ account: Account }>(),
);
export const GetAccountByIdFailAction = createAction(
  ACCOUNT_ACTIONS.GET_BY_ID_FAIL,
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

export const ClearStateAction = createAction(ACCOUNT_ACTIONS.CLEAR_STATE);
