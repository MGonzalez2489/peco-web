import { createSelector } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { EntryCategoryState } from '@store/reducers/session/entry-category.reducer';

const entryCategoriesState = (state: AppState) => state.entryCategories;

export const selectEntryCategories = createSelector(
  entryCategoriesState,
  (state: EntryCategoryState) => state.data,
);
