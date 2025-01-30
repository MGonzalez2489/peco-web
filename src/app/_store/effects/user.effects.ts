import { inject, Injectable } from '@angular/core';
import { UserService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AccountActions } from '@store/actions/account.actions';
import { AuthActions } from '@store/actions/auth.actions';
import { EntryCategoryActions } from '@store/actions/entry-category.actions';
import { IdentityActions } from '@store/actions/identity.actions';
import { AppState } from '@store/reducers';
import { exhaustMap, map } from 'rxjs';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private store$ = inject(Store<AppState>);
  private userService = inject(UserService);

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IdentityActions.loadIdentity),
      exhaustMap((action) =>
        this.userService.get().pipe(
          map((result) => {
            return IdentityActions.loadIdentitySuccess({ data: result.data });
          }),
        ),
      ),
    );
  });

  //get user info
  getUserInfo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
        map(() => {
          this.store$.dispatch(AccountActions.loadAccounts());
          this.store$.dispatch(EntryCategoryActions.loadEntryCategories());
          this.store$.dispatch(IdentityActions.loadIdentity());
        }),
      ),
    { dispatch: false },
  );
}
