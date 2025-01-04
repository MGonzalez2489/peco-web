import { createSelector } from '@ngrx/store';
import { AppState, UserState } from '@store/states';

const userState = (state: AppState) => state.user;

export const selectCategories = createSelector(
  userState,
  (state: UserState) => state.categories,
);
