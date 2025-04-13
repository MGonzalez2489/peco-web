/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchDto } from '@core/models/dtos/search';
import { AccountType, EntryStatus, EntryType } from '@core/models/entities';
import { createActionGroup, props } from '@ngrx/store';

export const CatalogsActions = createActionGroup({
  source: 'Catalogs',
  events: {
    'Load Entry Type': props<{ filters: SearchDto }>(),
    'Load Entry Type Success': props<{ data: EntryType[] }>(),
    'Load Entry Type Failure': props<{ payload: any }>(),

    'Load Account Type': props<{ filters: SearchDto }>(),
    'Load Account Type Success': props<{ data: AccountType[] }>(),
    'Load Account Type Failure': props<{ payload: any }>(),

    'Load Entry Status': props<{ filters: SearchDto }>(),
    'Load Entry Status Success': props<{ data: EntryStatus[] }>(),
    'Load Entry Status Failure': props<{ payload: any }>(),
  },
});
