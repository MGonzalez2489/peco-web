import { ActionReducerMap } from '@ngrx/store';
import { AuthReducer, AuthState } from './auth.reducer';

export const pecoFeatureKey = 'peco';

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: AuthReducer,
};
