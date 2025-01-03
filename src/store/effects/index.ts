import { AccountEffects } from './account.effects';
import { AuthEffects } from './auth.effects';
import { CatalogsEffects } from './catalogs.effects';

export const AppEffects = [AuthEffects, AccountEffects, CatalogsEffects];
