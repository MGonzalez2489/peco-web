import { ActionReducer, INIT } from '@ngrx/store';
import { AppState } from '..';
import { AuthActions } from '@store/actions/auth.actions';

export const HydrationMetaReducer = (
  reducer: ActionReducer<AppState>,
): ActionReducer<AppState> => {
  return (state, action) => {
    if (action.type === INIT) {
      const storageValue = localStorage.getItem('state');
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem('state');
        }
      }
    }

    const nextState = reducer(state, action);

    localStorage.setItem('state', JSON.stringify(nextState));
    return nextState;
  };
};
export const LogoutMetaReducer = (
  reducer: ActionReducer<AppState>,
): ActionReducer<AppState> => {
  return (state, action) => {
    let nextState = reducer(state, action);

    if (action.type === AuthActions.logout.type) {
      localStorage.removeItem('state');
      localStorage.clear();
      nextState = {} as AppState;
    }
    return nextState;
  };
};
