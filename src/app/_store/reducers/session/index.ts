import { ActionReducerMap } from '@ngrx/store';
import { AuthReducer, AuthState } from './auth.reducer';
import { UserReducer, UserState } from './user.reducer';
import { AccountReducer, AccountState } from './accounts.reducer';
import {
  EntryCategoryReducer,
  EntryCategoryState,
} from './entry-category.reducer';

export const sessionFeatureKey = 'session';

export interface SessionState {
  auth: AuthState;
  user: UserState;
  accounts: AccountState;
  entryCategories: EntryCategoryState;
}

export const SessionReducer: ActionReducerMap<SessionState> = {
  auth: AuthReducer,
  user: UserReducer,
  accounts: AccountReducer,
  entryCategories: EntryCategoryReducer,
};
