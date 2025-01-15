import { AccountState } from './account.state';
import { EntryCategoryState } from './entry-category.state';

export type UserState = {
  accounts: AccountState;
  entry_categories: EntryCategoryState;
};
