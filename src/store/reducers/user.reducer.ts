import { combineReducers } from '@ngrx/store';
import { AccountReducer } from './account.reducer';
import { CategoriesReducer } from './category.reducer';
import { UserState } from '@store/states/user/user.state';

export const UserReducer = combineReducers<UserState>({
  accounts: AccountReducer,
  categories: CategoriesReducer,
});
