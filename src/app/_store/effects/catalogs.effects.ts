import { inject, Injectable } from '@angular/core';
import { CatalogsService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CatalogsActions } from '@store/actions/catalogs.actions';
import { exhaustMap, map } from 'rxjs';

@Injectable()
export class CatalogsEffects {
  private actions$ = inject(Actions);
  private catalogsService = inject(CatalogsService);

  //Get Entry Types
  getEntryTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CatalogsActions.loadEntryType),
      exhaustMap((action) =>
        this.catalogsService.getEntryTypes(action.filters).pipe(
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
      exhaustMap((action) =>
        this.catalogsService.getEntryStatus(action.filters).pipe(
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
      exhaustMap((action) =>
        this.catalogsService.getAccountTypes(action.filters).pipe(
          map((result) => {
            return CatalogsActions.loadAccountTypeSuccess({
              data: result.data,
            });
          }),
        ),
      ),
    );
  });
}
