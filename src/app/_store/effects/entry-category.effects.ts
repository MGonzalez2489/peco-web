import { inject, Injectable } from '@angular/core';
import { ResultListDto } from '@core/models/dtos';
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
      mergeMap(() => {
        return this.entryCategoryService.getAll().pipe(
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
}
