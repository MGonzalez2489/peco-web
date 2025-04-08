import { inject, Injectable } from '@angular/core';
import { ResultDto, ResultListDto } from '@core/models/dtos';
import { EntryCategory } from '@core/models/entities';
import { EntryCategoryService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EntryCategoryActions } from '@store/actions/entry-category.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class EntryCategoryEffects {
  private actions$ = inject(Actions);
  private entryCategoryService = inject(EntryCategoryService);

  //categories
  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EntryCategoryActions.loadEntryCategories),
      mergeMap((action) => {
        return this.entryCategoryService.getAll(action.search).pipe(
          map((response: ResultListDto<EntryCategory>) => {
            return EntryCategoryActions.loadEntryCategoriesSuccess({
              entryCategoryArray: response.data,
            });
          }),
          catchError((err) => {
            return of(
              EntryCategoryActions.loadEntryCategoriesFailure({ payload: err }),
            );
          }),
        );
      }),
    ),
  );

  //create
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EntryCategoryActions.createEntryCategory),
      mergeMap((action) => {
        return this.entryCategoryService.create(action.category).pipe(
          map((response: ResultDto<EntryCategory>) => {
            return EntryCategoryActions.createEntryCategorySuccess({
              category: response.data,
            });
          }),
          catchError((err) => {
            return of(
              EntryCategoryActions.createEntryCategoryFailure({
                payload: err,
              }),
            );
          }),
        );
      }),
    ),
  );

  //update
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EntryCategoryActions.updateEntryCategory),
      mergeMap((action) => {
        return this.entryCategoryService
          .update(action.categoryId, action.category)
          .pipe(
            map((response: ResultDto<EntryCategory>) => {
              return EntryCategoryActions.updateEntryCategorySuccess({
                category: response.data,
              });
            }),
            catchError((err) => {
              return of(
                EntryCategoryActions.updateEntryCategoryFailure({
                  payload: err,
                }),
              );
            }),
          );
      }),
    ),
  );

  //
}
