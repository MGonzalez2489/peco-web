import { EntryType } from '@core/models/entities';
import { createReducer } from '@ngrx/store';

export const catalogsFeatureKey = 'catalogs';

export interface CatalogsState {
  entryTypes: EntryType[];
}

export const initialState: CatalogsState = {
  entryTypes: [],
};

export const CatalogsReducer = createReducer(initialState);
