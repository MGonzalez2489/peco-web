import { ActionReducerMap } from '@ngrx/store';
import { AuthReducer, AuthState } from './auth.reducer';
import { CatalogsReducer, CatalogsState } from './catalogs.reducer';
import { UserReducer, UserState } from './user.reducer';

export const pecoFeatureKey = 'peco';

export interface AppState {
  auth: AuthState;
  catalogs: CatalogsState;
  user: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: AuthReducer,
  catalogs: CatalogsReducer,
  user: UserReducer,
};
