import { EntryType } from '@core/models/entities';
import { createReducer, on } from '@ngrx/store';
import { CatalogsActions } from '@store/actions/catalogs.actions';

export const catalogsFeatureKey = 'catalogs';

export interface CatalogsState {
  entrytypes: EntryType[];
}

export const initialState: CatalogsState = {
  entrytypes: [],
};

export const CatalogsReducer = createReducer(
  initialState,
  on(CatalogsActions.loadEntryTypeSuccess, (state, { data }) => {
    console.log('data', data);
    return {
      ...state,
      entrytypes: data,
    };
  }),
);
