import { AccountService } from '@accounts/account.service';
import { inject, Injectable } from '@angular/core';
import { UiService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AccountActions } from '@store/actions/account.actions';
import { exhaustMap, map } from 'rxjs';

@Injectable()
export class AccountEffects {
  private actions$ = inject(Actions);
  private accountService = inject(AccountService);
  private uiService = inject(UiService);
  //Get All
  getAll$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AccountActions.loadAccounts),
      exhaustMap((action) =>
        this.accountService
          .getAll(action.search)
          .pipe(
            map((result) =>
              AccountActions.loadAccountsSuccess({ accounts: result.data }),
            ),
          ),
      ),
    );
  });

  //GET BY ID
  getById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AccountActions.getById),
      exhaustMap((action) =>
        this.accountService
          .getById(action.accountId)
          .pipe(
            map((result) =>
              AccountActions.getByIdSuccess({ account: result.data }),
            ),
          ),
      ),
    );
  });

  //CREATE
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.create),
      exhaustMap((action) =>
        this.accountService.create(action.data).pipe(
          map((result) => {
            this.uiService.message.set(`Cuenta ${result.data.name} creada.`);
            return AccountActions.createSuccess({ account: result.data });
          }),
        ),
      ),
    ),
  );

  //UPDATE
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.update),
      exhaustMap((action) =>
        this.accountService
          .update(action.data, action.accountId)
          .pipe(
            map((result) =>
              AccountActions.updateSuccess({ account: result.data }),
            ),
          ),
      ),
    ),
  );

  //DELETE
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.delete),
      exhaustMap((action) =>
        this.accountService
          .delete(action.accountId)
          .pipe(
            map(() =>
              AccountActions.deleteSuccess({ accountId: action.accountId }),
            ),
          ),
      ),
    ),
  );
}
