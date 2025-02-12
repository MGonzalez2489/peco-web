import { AccountType, EntryType } from '@core/models/entities';
import { createReducer, on } from '@ngrx/store';
import { CatalogsActions } from '@store/actions/catalogs.actions';

export const catalogsFeatureKey = 'catalogs';

export interface CatalogsState {
  accountTypes: AccountType[];
  entryTypes: EntryType[];
}

export const initialState: CatalogsState = {
  accountTypes: [],
  entryTypes: [],
};

export const CatalogsReducer = createReducer(
  initialState,
  on(CatalogsActions.loadEntryTypeSuccess, (state, { data }) => ({
    ...state,
    entryTypes: data,
  })),
  on(CatalogsActions.loadAccountTypeSuccess, (state, { data }) => ({
    ...state,
    accountTypes: data,
  })),
);
