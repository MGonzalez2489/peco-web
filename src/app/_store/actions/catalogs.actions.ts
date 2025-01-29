import { EntryType } from '@core/models/entities';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CatalogsActions = createActionGroup({
  source: 'Catalogs',
  events: {
    'Load Entry Type': emptyProps(),
    'Load Entry Type Success': props<{ data: EntryType[] }>(),
    'Load Entry Type Failure': props<{ payload: any }>(),
  },
});
