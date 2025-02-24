import { AccountType, EntryStatus, EntryType } from '@core/models/entities';
import { createReducer, on } from '@ngrx/store';
import { CatalogsActions } from '@store/actions/catalogs.actions';

export const catalogsFeatureKey = 'catalogs';

export interface CatalogsState {
  accountTypes: AccountType[];
  entryTypes: EntryType[];
  entryStatuses: EntryStatus[];
}

export const initialState: CatalogsState = {
  accountTypes: [],
  entryTypes: [],
  entryStatuses: [],
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
  on(CatalogsActions.loadEntryStatusSuccess, (state, { data }) => ({
    ...state,
    entryStatuses: data,
  })),
);
