import { createSelector } from '@ngrx/store';
import { AppState, CatalogsState } from '@store/states';

const catState = (state: AppState) => state.catalogs;

export const selectEntryTypes = createSelector(
  catState,
  (state: CatalogsState) => state.entryTypes,
);
