import { createSelector } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { EntryCategoryState } from '@store/reducers/entry-category.reducer';

const entryCategoriesState = (state: AppState) => state.user.entryCategories;

export const selectEntryCategories = createSelector(
  entryCategoriesState,
  (state: EntryCategoryState) => Array.from(state.values()),
);
