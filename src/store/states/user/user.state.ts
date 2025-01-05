import { AccountState } from './account.state';
import { CategoryState } from './category.state';

export type UserState = {
  accounts: AccountState;
  categories: CategoryState;
};
