import { createSelector } from '@ngrx/store';
import { AppState } from '@store/states';
import { UserState } from '@store/states/user';

const userState = (state: AppState) => state.user;

export const selectCategories = createSelector(
  userState,
  (state: UserState) => state.categories,
);
