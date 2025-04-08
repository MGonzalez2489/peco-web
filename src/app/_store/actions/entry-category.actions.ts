/* eslint-disable @typescript-eslint/no-explicit-any */
import { createActionGroup, props } from '@ngrx/store';

import {
  EntryCategoryCreateDto,
  EntryCategoryUpdateDto,
} from '@core/models/dtos';
import { SearchDto } from '@core/models/dtos/search';
import { EntryCategory } from '@core/models/entities';
export const EntryCategoryActions = createActionGroup({
  source: 'EntryCategory',
  events: {
    'Load Entry Categories': props<{ search: SearchDto }>(),
    'Load Entry Categories Success': props<{
      entryCategoryArray: EntryCategory[];
    }>(),
    'Load Entry Categories Failure': props<{ payload: any }>(),

    'Create Entry Category': props<{
      category: EntryCategoryCreateDto;
    }>(),
    'Create Entry Category Success': props<{
      category: EntryCategory;
    }>(),
    'Create Entry Category Failure': props<{ payload: any }>(),

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
