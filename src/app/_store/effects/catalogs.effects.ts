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
  getEntryType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CatalogsActions.loadEntryType),
      exhaustMap(() =>
        this.catalogsService.getEntryTipes().pipe(
          map((result) => {
            console.log('res', result);
            return CatalogsActions.loadEntryTypeSuccess({ data: result });
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
          console.log('entro');
          this.store$.dispatch(CatalogsActions.loadEntryType());
        }),
      ),
    { dispatch: false },
  );
}
