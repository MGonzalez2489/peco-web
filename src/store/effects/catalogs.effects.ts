import { Injectable, inject } from '@angular/core';
import { CatEntryType } from '@core/models/api/catalogs';
import { CatalogsService } from '@core/services/catalogs.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  LogoutAction,
  RegisterSuccessAction,
  SigninSuccessAction,
} from '@store/actions/auth.action';

import {
  ClearStateAction,
  GetEntryTypeAction,
  GetEntryTypeFailAction,
  GetEntryTypeSuccessAction,
} from '@store/actions/catalogs.actions';
import { AppState } from '@store/states';

import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CatalogsEffects {
  private actions$ = inject(Actions);
  private catalogsService = inject(CatalogsService);

  private store$ = inject(Store<AppState>);
  getCatalogsInfo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SigninSuccessAction, RegisterSuccessAction),
        map(() => {
          this.store$.dispatch(GetEntryTypeAction());
        }),
      ),
    { dispatch: false },
  );

  getEntryTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetEntryTypeAction),
      mergeMap(() => {
        return this.catalogsService.getEntryTipes().pipe(
          map((response: CatEntryType[]) => {
            return GetEntryTypeSuccessAction({ entryTypes: response });
          }),
          catchError((err) => {
            return of(GetEntryTypeFailAction({ payload: err }));
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
