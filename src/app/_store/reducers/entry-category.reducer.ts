import { createReducer, on } from '@ngrx/store';
import { EntryCategoryActions } from './entry-category.actions';

export const entryCategoryFeatureKey = 'entryCategory';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
);

