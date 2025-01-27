import { inject, Injectable } from '@angular/core';
import { AccountService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AccountActions } from '@store/actions/account.actions';
import { exhaustMap, map } from 'rxjs';

@Injectable()
export class AccountEffects {
  private actions$ = inject(Actions);
  private accountService = inject(AccountService);
  //Get All
  getAll$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AccountActions.loadAccounts),
      exhaustMap((action) =>
        this.accountService
          .getAll()
          .pipe(
            map((result) =>
              AccountActions.loadAccountsSuccess({ data: result.data }),
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
        this.accountService
          .create(action.data)
          .pipe(
            map((result) =>
              AccountActions.createSuccess({ data: result.data }),
            ),
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
              AccountActions.updateSuccess({ data: result.data }),
            ),
          ),
      ),
    ),
  );
}
