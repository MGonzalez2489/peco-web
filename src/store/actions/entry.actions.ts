import { createAction, props } from '@ngrx/store';
import { Entry } from '@core/models/api';

enum ENTRY_ACTIONS {
  CREATE = '[ENTRY] Create Entry',
  CREATE_SUCCESS = '[ENTRY] Create Entry Success',
  CREATE_FAIL = '[ENTRY] Create Entry Fail',
}

export const CreateEntryAction = createAction(
  ENTRY_ACTIONS.CREATE,
  props<{ accountId: string; newEntry: Entry }>(),
);

export const CreateEntrySuccess = createAction(ENTRY_ACTIONS.CREATE_SUCCESS);
export const CreateEntryFail = createAction(
  ENTRY_ACTIONS.CREATE_FAIL,
  props<{ payload: any }>(),
);
