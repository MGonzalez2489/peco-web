import { EntryCategory } from '@core/models/entities';
import { createReducer, on } from '@ngrx/store';
import { EntryCategoryActions } from '@store/actions/entry-category.actions';

export const entryCategoryFeatureKey = 'entryCategory';

export type EntryCategoryState = EntryCategory[];

export const initialState: EntryCategoryState = [];

export const EntryCategoryReducer = createReducer(
  initialState,

  on(EntryCategoryActions.loadEntryCategoriesSuccess, (state, { data }) => {
    return { ...state, data };
  }),
);
