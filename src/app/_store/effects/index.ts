import { AccountEffects } from './account.effects';
import { AuthEffects } from './auth.effects';
import { CatalogsEffects } from './catalogs.effects';
import { UserEffects } from './user.effects';

export const effects: any[] = [
  AuthEffects,
  AccountEffects,
  UserEffects,
  CatalogsEffects,
];
