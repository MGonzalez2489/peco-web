import { environment } from '@envs/environment';

//NgRx
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { reducers } from './reducers';
import { metaReducers } from './reducers/meta';
import { effects } from './effects';

export const PecoStoreProvider = [
  provideStore(reducers, { metaReducers }),
  provideStoreDevtools({
    maxAge: 500,
    logOnly: !environment.isProduction,
    trace: true,
  }),
  provideEffects(effects),
];
