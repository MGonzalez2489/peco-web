import { ActionReducerMap } from '@ngrx/store';
import { AuthReducer } from './auth.reducer';
import { AppState } from '@store/states';
import { AccountReducer } from './account.reducer';

export const AppReducers: ActionReducerMap<AppState> = {
  auth: AuthReducer,
  account: AccountReducer,
};
