import { AuthState } from './auth.state';
import { CatalogsState } from './catalogs.state';
import { UserState } from './user';

export type AppState = {
  auth: AuthState;
  user: UserState;
  catalogs: CatalogsState;
};
