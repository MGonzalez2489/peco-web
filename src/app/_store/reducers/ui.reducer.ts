import { createReducer } from '@ngrx/store';

export const uiFeatureKey = 'ui';

export interface UiState {
  isSideBarOpen: boolean;
}

const initialState: UiState = {
  isSideBarOpen: false,
};

export const UiReducer = createReducer(initialState);
