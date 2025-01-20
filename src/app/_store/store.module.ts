import { environment } from '@envs/environment';

//NgRx
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';

const reducers = [];
const effects: any[] = [];

export const PecoStoreProvider = [
  provideStore(),
  provideStoreDevtools({
    maxAge: 500,
    logOnly: !environment.isProduction,
    trace: true,
  }),
  provideEffects(effects),
];
