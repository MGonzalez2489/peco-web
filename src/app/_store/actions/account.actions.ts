import { createActionGroup, props } from '@ngrx/store';
import { Account } from '@core/models/entities';
import { AccountCreateDto } from '@core/models/dtos';
import { SearchDto } from '@core/models/dtos/search';

export const AccountActions = createActionGroup({
  source: 'Account',
  events: {
    'Load Accounts': props<{ search: SearchDto }>(),
    'Load Accounts Success': props<{ accounts: Account[] }>(),
    'Load Accounts Failure': props<{ payload: never }>(),

    'Get By Id': props<{ accountId: string }>(),
    'Get By Id Success': props<{ account: Account }>(),
    'Get By Id Failure': props<{ payload: never }>(),

    Create: props<{ data: AccountCreateDto }>(),
    'Create Success': props<{ account: Account }>(),
    'Create Failed': props<{ payload: never }>(),

    Update: props<{ data: AccountCreateDto; accountId: string }>(),
    'Update Success': props<{ account: Account }>(),
    'Update Failed': props<{ payload: never }>(),

    Delete: props<{ accountId: string }>(),
    'Delete Success': props<{ accountId: string }>(),
    'Delete Failed': props<{ payload: never }>(),
  },
});
