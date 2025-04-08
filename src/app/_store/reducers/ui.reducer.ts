import { RouteData } from '@core/models/app';
import { DateFilterDto } from '@entries/dto';
import { createReducer, on } from '@ngrx/store';
import { UiActions } from '@store/actions/ui.actions';

export const uiFeatureKey = 'ui';

export interface UiState {
  page: RouteData;
  isBusy: boolean;
  errorMessage?: string;
  period: DateFilterDto;

  isLoadedSession: boolean;
  isLoadingSession: boolean;
}

const initialState: UiState = {
  page: { pageTitle: '', filterByPeriod: false },
  isBusy: false,
  errorMessage: undefined,
  period: { from: '', to: '', type: '' },

  isLoadedSession: false,
  isLoadingSession: false,
};

export const UiReducer = createReducer(
  initialState,

  on(UiActions.setPageData, (state, { data }) => ({
    ...state,
    page: data,
  })),

  on(UiActions.setLoadingSession, (state, { loading }) => ({
    ...state,
    isLoadingSession: loading,
  })),
  on(UiActions.setLoadedSession, (state, { loaded }) => ({
    ...state,
    isLoadedSession: loaded,
  })),
  on(UiActions.setPeriod, (state, { newPeriod }) => ({
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
