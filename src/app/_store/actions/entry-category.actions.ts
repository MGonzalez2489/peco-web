import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { EntryCategory } from '@core/models/entities';
export const EntryCategoryActions = createActionGroup({
  source: 'EntryCategory',
  events: {
    'Load Entry Categories': emptyProps(),
    'Load Entry Categories Success': props<{
      entryCategoryArray: EntryCategory[];
    }>(),
    'Load Entry Categories Failure': props<{ payload: any }>(),
  },
});
