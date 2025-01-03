import { AuthState } from './auth.state';
import { AccountState } from './account.state';
import { CatalogsState } from './catalogs.state';

export interface AppState {
  auth: AuthState;
  account: AccountState;
  catalogs: CatalogsState;
}
