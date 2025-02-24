import { inject, Injectable } from '@angular/core';
import { CatalogsService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuthActions } from '@store/actions/auth.actions';
import { CatalogsActions } from '@store/actions/catalogs.actions';
import { AppState } from '@store/reducers';
import { exhaustMap, map } from 'rxjs';

@Injectable()
export class CatalogsEffects {
  private actions$ = inject(Actions);
  private store$ = inject(Store<AppState>);
  private catalogsService = inject(CatalogsService);

  //Get Entry Types
  getEntryTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CatalogsActions.loadEntryType),
      exhaustMap(() =>
        this.catalogsService.getEntryTypes().pipe(
          map((result) => {
            return CatalogsActions.loadEntryTypeSuccess({ data: result.data });
          }),
        ),
      ),
    );
  });

  //Get Entry Status
  getEntryStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CatalogsActions.loadEntryStatus),
      exhaustMap(() =>
        this.catalogsService.getEntryStatus().pipe(
          map((result) => {
            return CatalogsActions.loadEntryStatusSuccess({
              data: result.data,
            });
          }),
        ),
      ),
    );
  });

  //Get Account Types
  getAccountTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CatalogsActions.loadAccountType),
      exhaustMap(() =>
        this.catalogsService.getAccountTypes().pipe(
          map((result) => {
            return CatalogsActions.loadAccountTypeSuccess({
              data: result.data,
            });
          }),
        ),
      ),
    );
  });

  //get user info
  getCatalogs$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
        map(() => {
          this.store$.dispatch(CatalogsActions.loadEntryType());
          this.store$.dispatch(CatalogsActions.loadAccountType());
          this.store$.dispatch(CatalogsActions.loadEntryStatus());
        }),
      ),
    { dispatch: false },
  );
}
