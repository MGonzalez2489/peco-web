import { createSelector } from '@ngrx/store';
import { AppState } from '@store/reducers';

const state = (state: AppState) => state;

export const selectUser = createSelector(
  state,
  (state: AppState) => state.user,
);
