import { AccountEffects } from './account.effects';
import { AuthEffects } from './auth.effects';
import { CatalogsEffects } from './catalogs.effects';
import { CategoryEffects } from './category.effects';
import { UserEffects } from './user.effects';

export const AppEffects = [
  CatalogsEffects,
  AuthEffects,
  AccountEffects,
  CategoryEffects,
  UserEffects,
];
