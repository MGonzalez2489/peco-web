import { combineReducers } from '@ngrx/store';
import { AccountReducer } from './account.reducer';
import { UserState } from '@store/states/user/user.state';
import { EntryCategoryReducer } from './entry-category.reducer';

export const UserReducer = combineReducers<UserState>({
  accounts: AccountReducer,
  entry_categories: EntryCategoryReducer,
});
