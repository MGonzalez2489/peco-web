import { createSelector } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { UiState } from '@store/reducers/ui.reducer';

const uiState = (state: AppState) => state.ui;

export const selectIsSideBarOpen = createSelector(
  uiState,
  (state: UiState) => state.isSideBarOpen,
);

export const selectIsBusy = createSelector(
  uiState,
  (state: UiState) => state.isBusy,
);

export const selectErrorMessage = createSelector(
  uiState,
  (state: UiState) => state.errorMessage,
);
