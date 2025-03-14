import { PlannedEntry } from '@core/models/entities/planned-entry.entity';
import { createReducer, on } from '@ngrx/store';
import { PlannedEntryActions } from '@store/actions/planned-entry.actions';

export interface PlannedEntriesState {
  data: PlannedEntry[];
}

const initialstate: PlannedEntriesState = {
  data: [],
};

export const PlannedEntryReducer = createReducer(
  initialstate,
  on(
    PlannedEntryActions.loadPlannedEntriesSuccess,
    (state, { plannedEntries }) => {
      return { ...state, data: plannedEntries };
    },
  ),

  on(PlannedEntryActions.createPlannedEntrySuccess, (state, { entry }) => {
    return { ...state, data: [entry, ...state.data] };
  }),
);
