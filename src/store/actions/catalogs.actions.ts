import { CatEntryType } from '@core/models/api/catalogs';
import { createAction, props } from '@ngrx/store';

enum CATALOGS_ACTIONS {
  GET_ENTRY_TYPES = '[Catalogs] Get Entry Types',
  GET_ENTRY_TYPES_SUCCESS = '[Catalogs] Get Entry Types Success',
  GET_ENTRY_TYPES_FAIL = '[Catalogs] Get Entry Types Fail',
}

//Entry Types
export const GetEntryTypeAction = createAction(
  CATALOGS_ACTIONS.GET_ENTRY_TYPES,
);

export const GetEntryTypeSuccessAction = createAction(
  CATALOGS_ACTIONS.GET_ENTRY_TYPES_SUCCESS,
  props<{ entryTypes: CatEntryType[] }>(),
);

export const GetEntryTypeFailAction = createAction(
  CATALOGS_ACTIONS.GET_ENTRY_TYPES_FAIL,
  props<{ payload: any }>(),
);
