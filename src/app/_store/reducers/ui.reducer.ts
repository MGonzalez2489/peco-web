import { DateFilterDto } from '@entries/dto';
import { createReducer, on } from '@ngrx/store';
import { UiActions } from '@store/actions/ui.actions';

export const uiFeatureKey = 'ui';

export interface UiState {
  isBusy: boolean;
  errorMessage?: string;
  period: DateFilterDto;
}

const initialState: UiState = {
  isBusy: false,
  errorMessage: undefined,
  period: { from: '', to: '', type: '' },
};

export const UiReducer = createReducer(
  initialState,
  on(UiActions.setPeriodSuccess, (state, { newPeriod }) => ({
    ...state,
    period: newPeriod,
  })),
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
