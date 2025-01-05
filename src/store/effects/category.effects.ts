import { Injectable, inject } from '@angular/core';
import { Category } from '@core/models/api';
import { ResultListModel } from '@core/models/responses';
import { CategoriesService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LogoutAction } from '@store/actions/auth.action';
import {
  ClearStateAction,
  GetAllCategoriesAction,
  GetAllCategoriesFailAction,
  GetAllCategoriesSuccessAction,
} from '@store/actions/categories.actions';
import { AppState } from '@store/states';

import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CategoryEffects {
  private actions$ = inject(Actions);
  private categoriesService = inject(CategoriesService);
  private store$ = inject(Store<AppState>);

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

  //not dispatchables
  clearState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LogoutAction),
        map(() => {
          this.store$.dispatch(ClearStateAction());
        }),
      ),
    { dispatch: false },
  );
}
