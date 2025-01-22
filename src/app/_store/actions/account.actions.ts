import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Account } from '@core/models/entities';

export const AccountActions = createActionGroup({
  source: 'Account',
  events: {
    'Load Accounts': emptyProps(),
    'Load Accounts Success': props<{ data: Account[] }>(),
    'Load Accounts Failure': props<{ payload: any }>(),
  },
});
