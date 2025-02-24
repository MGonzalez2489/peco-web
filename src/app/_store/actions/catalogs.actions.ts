import { AccountType, EntryStatus, EntryType } from '@core/models/entities';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CatalogsActions = createActionGroup({
  source: 'Catalogs',
  events: {
    'Load Entry Type': emptyProps(),
    'Load Entry Type Success': props<{ data: EntryType[] }>(),
    'Load Entry Type Failure': props<{ payload: any }>(),

    'Load Account Type': emptyProps(),
    'Load Account Type Success': props<{ data: AccountType[] }>(),
    'Load Account Type Failure': props<{ payload: any }>(),

    'Load Entry Status': emptyProps(),
    'Load Entry Status Success': props<{ data: EntryStatus[] }>(),
    'Load Entry Status Failure': props<{ payload: any }>(),
  },
});
