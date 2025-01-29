import { EntryType } from '@core/models/entities';
import { createReducer, on } from '@ngrx/store';
import { CatalogsActions } from '@store/actions/catalogs.actions';

export const catalogsFeatureKey = 'catalogs';

export interface CatalogsState {
  entryTypes: EntryType[];
}

export const initialState: CatalogsState = {
  entryTypes: [],
};

export const CatalogsReducer = createReducer(
  initialState,
  on(CatalogsActions.loadEntryTypeSuccess, (state, { data }) => {
    return {
      ...state,
      entryTypes: data,
    };
  }),
);
