import { ActionReducerMap } from '@ngrx/store';
import { AuthReducer, AuthState } from './auth.reducer';
import { AccountReducer, AccountState } from './account.reducer';

export const pecoFeatureKey = 'peco';

export interface AppState {
  auth: AuthState;
  accounts: AccountState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: AuthReducer,
  accounts: AccountReducer,
};
