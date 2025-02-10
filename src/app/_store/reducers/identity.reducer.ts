import { User } from '@core/models/entities';
import { createReducer, on } from '@ngrx/store';
import { IdentityActions } from '@store/actions/identity.actions';

export const identityFeatureKey = 'identity';

export type IdentityState = User;
// @ts-ignore
export const initialState: IdentityState = null;

export const IdentityReducer = createReducer(
  initialState,
  on(IdentityActions.loadIdentitySuccess, (state, { data }) => {
    return { ...state, data };
  }),
);
