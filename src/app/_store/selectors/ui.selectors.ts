import { createSelector } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { UiState } from '@store/reducers/ui.reducer';

const uiState = (state: AppState) => state.ui;

export const selectIsBusy = createSelector(
  uiState,
  (state: UiState) => state.isBusy,
);

export const selectErrorMessage = createSelector(
  uiState,
  (state: UiState) => state.errorMessage,
);

export const selectPeriod = createSelector(
  uiState,
  (state: UiState) => state.period,
);
export const selectPageData = createSelector(
  uiState,
  (state: UiState) => state.page,
);

export const selectIsLoadingSession = createSelector(
  uiState,
  (state: UiState) => state.isLoadingSession,
);

export const selectIsLoadedSession = createSelector(
  uiState,
  (state: UiState) => state.isLoadedSession,
);

export const selectPlatformInfo = createSelector(
  uiState,
  (state: UiState) => state.platform,
);

export const selectIsSideNavOpen = createSelector(
  uiState,
  (state: UiState) => state.sideNavOpen,
);
