import { createSelector } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { SessionState } from '@store/reducers/session';

const sessionState = (state: AppState) => state.session;

export const selectEntryCategories = createSelector(
  sessionState,
  (state: SessionState) => state.entryCategories.data,
);
