import { Injectable, inject } from '@angular/core';
import { Category } from '@core/models/api';
import { ResultListModel } from '@core/models/responses';
import { CategoriesService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  GetAllCategoriesAction,
  GetAllCategoriesFailAction,
  GetAllCategoriesSuccessAction,
} from '@store/actions/categories.actions';

import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CategoryEffects {
  private actions$ = inject(Actions);
  private categoriesService = inject(CategoriesService);

  //categories
  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllCategoriesAction),
      mergeMap((data) => {
        return this.categoriesService.getAll(data.pageOptions).pipe(
          map((response: ResultListModel<Category>) => {
            return GetAllCategoriesSuccessAction({ categories: response.data });
          }),
          catchError((err) => {
            return of(GetAllCategoriesFailAction({ payload: err }));
          }),
        );
      }),
    ),
  );
}
