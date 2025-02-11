import { ActionReducerMap } from '@ngrx/store';
import { CatalogsReducer, CatalogsState } from './catalogs.reducer';
import { SessionReducer, SessionState } from './session';
import { UiReducer, UiState } from './ui.reducer';

export interface AppState extends SessionState {
  ui: UiState;
  catalogs: CatalogsState;
}

export const AppReducers: ActionReducerMap<AppState> = {
  ui: UiReducer,
  catalogs: CatalogsReducer,
  ...SessionReducer,
};
