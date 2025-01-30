import { combineReducers, createReducer, on } from '@ngrx/store';
import { AccountReducer, AccountState } from './account.reducer';
import {
  EntryCategoryReducer,
  EntryCategoryState,
} from './entry-category.reducer';
import { IdentityReducer, IdentityState } from './identity.reducer';

export const userFeatureKey = 'user';

export type UserState = {
  accounts: AccountState;
  entryCategories: EntryCategoryState;
  identity: IdentityState;
};

export const initialState: UserState = {
  accounts: [],
  entryCategories: [],
  // @ts-ignore
  identity: null,
};

export const UserReducer = combineReducers<UserState>({
  accounts: AccountReducer,
  entryCategories: EntryCategoryReducer,
  identity: IdentityReducer,
});
