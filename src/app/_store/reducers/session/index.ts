import { ActionReducerMap } from '@ngrx/store';
import { AccountReducer, AccountState } from './accounts.reducer';
import { AuthReducer, AuthState } from './auth.reducer';
import {
  EntryCategoryReducer,
  EntryCategoryState,
} from './entry-category.reducer';
import { UserReducer, UserState } from './user.reducer';
import {
  PlannedEntriesState,
  PlannedEntryReducer,
} from './planned-entries.reducer';

export const sessionFeatureKey = 'session';

export interface SessionState {
  auth: AuthState;
  user: UserState;
  accounts: AccountState;
  entryCategories: EntryCategoryState;
  plannedEntries: PlannedEntriesState;
}

export const SessionReducerMap: ActionReducerMap<SessionState> = {
  auth: AuthReducer,
  user: UserReducer,
  accounts: AccountReducer,
  entryCategories: EntryCategoryReducer,
  plannedEntries: PlannedEntryReducer,
};
