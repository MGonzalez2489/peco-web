/* eslint-disable @typescript-eslint/no-explicit-any */
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { EntryCategory } from '@core/models/entities';
import { EntryCategoryUpdateDto } from '@core/models/dtos';
export const EntryCategoryActions = createActionGroup({
  source: 'EntryCategory',
  events: {
    'Load Entry Categories': emptyProps(),
    'Load Entry Categories Success': props<{
      entryCategoryArray: EntryCategory[];
    }>(),
    'Load Entry Categories Failure': props<{ payload: any }>(),

    'Update Entry Category': props<{
      categoryId: string;
      category: EntryCategoryUpdateDto;
    }>(),
    'Update Entry Category Success': props<{
      category: EntryCategory;
    }>(),
    'Update Entry Category Failure': props<{ payload: any }>(),
  },
});
