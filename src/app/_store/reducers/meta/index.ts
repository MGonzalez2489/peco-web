import { MetaReducer } from '@ngrx/store';
import { AppState } from '..';
import { HydrationMetaReducer } from './hydrationMetaReducer.reducer';

// export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
export const metaReducers: MetaReducer<AppState>[] = [HydrationMetaReducer];
