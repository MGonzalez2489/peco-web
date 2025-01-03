import { AuthState } from './auth.state';
import { UserState } from './user.state';

export type AppState = {
  auth: AuthState;
  user: UserState;
};
