import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Account } from '@core/models/entities';
import { AccountCreateDto } from '@core/models/dtos';

export const AccountActions = createActionGroup({
  source: 'Account',
  events: {
    'Load Accounts': emptyProps(),
    'Load Accounts Success': props<{ data: Account[] }>(),
    'Load Accounts Failure': props<{ payload: any }>(),

    'Get By Id': props<{ accountId: string }>(),
    'Get By Id Success': props<{ data: Account }>(),
    'Get By Id Failure': props<{ payload: any }>(),

    Create: props<{ data: AccountCreateDto }>(),
    'Create Success': props<{ data: Account }>(),
    'Create Failed': props<{ payload: any }>(),

    Update: props<{ data: Account; accountId: string }>(),
    'Update Success': props<{ data: Account }>(),
    'Update Failed': props<{ payload: any }>(),

    Delete: props<{ accountId: string }>(),
    'Delete Success': props<{ accountId: string }>(),
    'Delete Failed': props<{ payload: any }>(),
  },
});
