import { createReducer, on } from '@ngrx/store';
import { UiActions } from '@store/actions/ui.actions';

export const uiFeatureKey = 'ui';

export interface UiState {
  isBusy: boolean;
  errorMessage?: string;
}

const initialState: UiState = {
  isBusy: false,
  errorMessage: undefined,
};

export const UiReducer = createReducer(
  initialState,
  on(UiActions.setBusyOn, (state) => ({
    ...state,
    isBusy: true,
  })),
  on(UiActions.setBusyOff, (state) => ({
    ...state,
    isBusy: false,
  })),

  on(UiActions.setErrorMessage, (state, { message }) => ({
    ...state,
    errorMessage: message,
  })),
  on(UiActions.removeErrorMessage, (state) => ({
    ...state,
    errorMessage: undefined,
  })),
);
