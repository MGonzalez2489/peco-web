import { MetaReducer } from '@ngrx/store';
import { AppState } from '..';
import {
  HydrationMetaReducer,
  LogoutMetaReducer,
} from './hydrationMetaReducer.reducer';

// export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
export const metaReducers: MetaReducer<AppState>[] = [
  HydrationMetaReducer,
  LogoutMetaReducer,
];
