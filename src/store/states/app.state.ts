import { AuthState } from './auth.state';
import { AccountState } from './account.state';

export interface AppState {
  auth: AuthState;
  account: AccountState;
}
