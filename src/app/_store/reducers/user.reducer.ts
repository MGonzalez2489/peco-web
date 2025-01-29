import { combineReducers, createReducer, on } from '@ngrx/store';
import { AccountReducer, AccountState } from './account.reducer';
import {
  EntryCategoryReducer,
  EntryCategoryState,
} from './entry-category.reducer';

export const userFeatureKey = 'user';

export type UserState = {
  accounts: AccountState;
  entryCategories: EntryCategoryState;
};

export const initialState: UserState = {
  accounts: [],
  entryCategories: [],
};

// export const UserReducer = createReducer(initialState);
export const UserReducer = combineReducers<UserState>({
  accounts: AccountReducer,
  entryCategories: EntryCategoryReducer,
});
