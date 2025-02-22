import { createReducer, on } from '@ngrx/store';
import { UserActions } from '@store/actions/profile.actions';

export const userFeatureKey = 'user';

export interface UserState {
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  dateOfBirth: string | undefined;
  createdAt: string | undefined;
}

const initialState: UserState = {
  email: undefined,
  firstName: undefined,
  lastName: undefined,
  dateOfBirth: undefined,
  createdAt: undefined,
};

export const UserReducer = createReducer(
  initialState,
  on(UserActions.loadUserSuccess, (state, { data }) => {
    return {
      ...state,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      createdAt: data.createdAt,
    };
  }),

  on(UserActions.updateUserSuccess, (state, { data }) => {
    return {
      ...state,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      createdAt: data.createdAt,
    };
  }),
);
