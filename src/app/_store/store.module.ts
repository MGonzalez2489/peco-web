import { environment } from '@envs/environment';

//NgRx
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { reducers } from './reducers';
import { AuthEffects } from './effects/auth.effects';

const effects: any[] = [AuthEffects];

export const PecoStoreProvider = [
  provideStore(reducers),
  provideStoreDevtools({
    maxAge: 500,
    logOnly: !environment.isProduction,
    trace: true,
  }),
  provideEffects(effects),
];
