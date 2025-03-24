/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlannedEntryCreateDto } from '@planned-entries/dto/planned-entry.dto';
import { PlannedEntry } from '@core/models/entities/';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const PlannedEntryActions = createActionGroup({
  source: 'PlannedEntry',
  events: {
    'Load Planned Entries': emptyProps(),
    'Load Planned Entries Success': props<{
      plannedEntries: PlannedEntry[];
    }>(),
    'Load Planned Entries Failure': props<{ payload: any }>(),

    'Create Planned Entry': props<{ entry: PlannedEntryCreateDto }>(),
    'Create Planned Entry Success': props<{
      entry: PlannedEntry;
    }>(),
    'Create Planned Entry Failure': props<{ payload: any }>(),
  },
});
