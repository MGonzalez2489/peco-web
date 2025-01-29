import { ActionReducerMap } from '@ngrx/store';
import { AuthReducer, AuthState } from './auth.reducer';
import { AccountReducer, AccountState } from './account.reducer';
import { CatalogsReducer, CatalogsState } from './catalogs.reducer';

export const pecoFeatureKey = 'peco';

export interface AppState {
  auth: AuthState;
  accounts: AccountState;
  catalogs: CatalogsState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: AuthReducer,
  accounts: AccountReducer,
  catalogs: CatalogsReducer,
};
