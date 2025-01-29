import { createSelector } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { CatalogsState } from '@store/reducers/catalogs.reducer';

const catalogsState = (state: AppState) => state.catalogs;

export const selectCatEntryTypes = createSelector(
  catalogsState,
  (state: CatalogsState) => state.entrytypes,
);
