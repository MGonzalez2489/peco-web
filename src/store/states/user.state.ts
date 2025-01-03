import { AccountState } from './account.state';
import { CategoryState } from './catalogs.state';

export type UserState = {
  accounts: AccountState;
  categories: CategoryState;
};
