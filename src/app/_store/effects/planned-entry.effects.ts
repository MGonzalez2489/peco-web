import { Injectable, inject } from '@angular/core';
import { ResultDto, ResultListDto } from '@core/models/dtos';
import { PlannedEntry } from '@core/models/entities';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlannedEntryService } from '@planned-entries/planned-entry.service';
import { PlannedEntryActions } from '@store/actions/planned-entry.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class PlannedEntryEffects {
  private actions$ = inject(Actions);
  private plannedEntryService = inject(PlannedEntryService);

  //load all
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlannedEntryActions.loadPlannedEntries),
      mergeMap(() => {
        return this.plannedEntryService.getAll().pipe(
          map((response: ResultListDto<PlannedEntry>) => {
            return PlannedEntryActions.loadPlannedEntriesSuccess({
              plannedEntries: response.data,
            });
          }),
          catchError((err) => {
            return of(
              PlannedEntryActions.loadPlannedEntriesFailure({ payload: err }),
            );
          }),
        );
      }),
    ),
  );

  //create
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlannedEntryActions.createPlannedEntry),
      mergeMap((action) => {
        return this.plannedEntryService.create(action.entry).pipe(
          map((response: ResultDto<PlannedEntry>) => {
            return PlannedEntryActions.createPlannedEntrySuccess({
              entry: response.data,
            });
          }),
          catchError((err) => {
            return of(
              PlannedEntryActions.createPlannedEntryFailure({
                payload: err,
              }),
            );
          }),
        );
      }),
    ),
  );
}
