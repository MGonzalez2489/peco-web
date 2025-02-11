import { createReducer, on } from '@ngrx/store';
import { UserActions } from '@store/actions/profile.actions';

export const userFeatureKey = 'user';

export interface UserState {
  email: string | undefined;
}

const initialState: UserState = {
  email: undefined,
};

export const UserReducer = createReducer(
  initialState,
  on(UserActions.loadUserSuccess, (state, { data }) => {
    return { ...state, email: data.email };
  }),
);
