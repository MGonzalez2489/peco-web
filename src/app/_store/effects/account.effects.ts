import { inject, Injectable } from '@angular/core';
import { AccountService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AccountActions } from '@store/actions/account.actions';
import { exhaustMap, map } from 'rxjs';

@Injectable()
export class AccountEffects {
  private actions$ = inject(Actions);
  private accountService = inject(AccountService);

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
}
