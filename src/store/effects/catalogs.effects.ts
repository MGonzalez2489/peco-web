import { Injectable, inject } from '@angular/core';
import { Category } from '@core/models/api';
import { ResultListModel } from '@core/models/responses';
import { CategoriesService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  RegisterSuccessAction,
  SigninSuccessAction,
} from '@store/actions/auth.action';

import { AppState } from '@store/states';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CatalogsEffects {
  private actions$ = inject(Actions);
  private categoriesService = inject(CategoriesService);
  private store$ = inject(Store<AppState>);

  // fillCatalogs$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(SigninSuccessAction, RegisterSuccessAction),
  //       map(() => {
  //         this.store$.dispatch(GetCategoriesAction({}));
  //       }),
  //     ),
  //   { dispatch: false },
  // );
}