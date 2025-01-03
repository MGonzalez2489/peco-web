import { UserState } from '@store/states';
import { combineReducers } from '@ngrx/store';
import { AccountReducer } from './account.reducer';
import { CategoriesReducer } from './category.reducer';

export const UserReducer = combineReducers<UserState>({
  accounts: AccountReducer,
  categories: CategoriesReducer,
});
