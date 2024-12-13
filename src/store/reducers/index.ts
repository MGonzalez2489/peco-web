import { ActionReducerMap } from '@ngrx/store';
import { AuthReducer } from './auth.reducer';
import { AppState } from '@store/states';

export const AppReducers: ActionReducerMap<AppState> = {
  auth: AuthReducer,
};
