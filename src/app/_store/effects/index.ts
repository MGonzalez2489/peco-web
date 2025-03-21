import { AccountEffects } from './account.effects';
import { AuthEffects } from './auth.effects';
import { CatalogsEffects } from './catalogs.effects';
import { EntryCategoryEffects } from './entry-category.effects';
import { PlannedEntryEffects } from './planned-entry.effects';
import { UserEffects } from './user.effects';

export const effects: any[] = [
  AuthEffects,
  AccountEffects,
  UserEffects,
  CatalogsEffects,
  EntryCategoryEffects,
  PlannedEntryEffects,
];
