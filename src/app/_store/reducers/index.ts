import { ActionReducerMap, combineReducers } from '@ngrx/store';
import { CatalogsReducer, CatalogsState } from './catalogs.reducer';
import { SessionReducerMap, SessionState } from './session';
import { UiReducer, UiState } from './ui.reducer';

export interface AppState {
  ui: UiState;
  catalogs: CatalogsState;
  session: SessionState;
}

const sessionReducer = combineReducers(SessionReducerMap);

export const AppReducers: ActionReducerMap<AppState> = {
  ui: UiReducer,
  catalogs: CatalogsReducer,
  session: sessionReducer,
};
