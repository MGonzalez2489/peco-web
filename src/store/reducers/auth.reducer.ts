import { AuthState } from '@store/states';
import { createRehydrateReducer } from './_rehydrateReducer';
import { FEATURE_NAME } from '@store/constants';
import { on } from '@ngrx/store';

import * as AuthActionsGroup from './../actions/auth.action';

const initialState: AuthState = {
  token: null,
};

const _authReducer = createRehydrateReducer(
  FEATURE_NAME.AUTH,
  initialState,
  on(AuthActionsGroup.SigninAction, (state) => {
    return state;
  }),
  on(AuthActionsGroup.SigninSuccessAction, (state, { token }) => {
    return {
      ...state,
      token: token.access_token,
    };
  }),
  on(AuthActionsGroup.SigninFailedAction, (state, { payload }) => {
    return state;
  }),
  on(AuthActionsGroup.SigninAction, (state) => {
    return state;
  }),
  // on(AuthActionsGroup.SigninSuccessAction, (state, { token }) => {
  //   return {
  //     ...state,
  //     token,
  //   };
  // }),
  // on(AuthActionsGroup.SigninFailedAction, (state, { payload }) => {
  //   return state;
  // }),
);

export function AuthReducer(state: any, action: any) {
  return _authReducer(state, action);
}
