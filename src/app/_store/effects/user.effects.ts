import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AccountActions } from '@store/actions/account.actions';
import { AuthActions } from '@store/actions/auth.actions';
import { EntryCategoryActions } from '@store/actions/entry-category.actions';
import { AppState } from '@store/reducers';
import { map } from 'rxjs';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private store$ = inject(Store<AppState>);

  //get user info
  getUserInfo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
        map(() => {
          this.store$.dispatch(AccountActions.loadAccounts());
          this.store$.dispatch(EntryCategoryActions.loadEntryCategories());
        }),
      ),
    { dispatch: false },
  );
}
