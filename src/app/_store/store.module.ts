import { environment } from '@envs/environment';

//NgRx
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { effects } from './effects';
import { AppReducers } from './reducers';
import { metaReducers } from './reducers/meta';

export const PecoStoreProvider = [
  provideStore(AppReducers, { metaReducers }),
  provideStoreDevtools({
    maxAge: 500,
    logOnly: !environment.isProduction,
    trace: true,
  }),
  provideEffects(effects),
];
