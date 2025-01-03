import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AuthReducer } from './auth.reducer';
import { AppState } from '@store/states';
import { UserReducer } from './user.reducer';

export const AppReducers: ActionReducerMap<AppState> = {
  auth: AuthReducer,
  user: UserReducer,
};

//meta
function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state: any, action: any) {
    if (
      action.type === '[AUTH] Logout' ||
      action.type === '[AUTH] Logout Success'
    ) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearState];
