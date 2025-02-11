import { EntryCategory } from '@core/models/entities';
import { createReducer, on } from '@ngrx/store';
import { EntryCategoryActions } from '@store/actions/entry-category.actions';

export const entryCategoryFeatureKey = 'entryCategory';

export interface EntryCategoryState {
  data: EntryCategory[];
}

const initialState: EntryCategoryState = {
  data: [],
};

export const EntryCategoryReducer = createReducer(
  initialState,

  on(
    EntryCategoryActions.loadEntryCategoriesSuccess,
    (state, { entryCategoryArray }) => {
      return { ...state, data: entryCategoryArray };
    },
  ),
);
