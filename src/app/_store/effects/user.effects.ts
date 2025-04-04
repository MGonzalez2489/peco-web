import { inject, Injectable } from '@angular/core';
import { SearchDto } from '@core/models/dtos/search';
import { UiService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UserService } from '@settings/profile/profile.service';
import { AccountActions } from '@store/actions/account.actions';
import { AuthActions } from '@store/actions/auth.actions';
import { EntryCategoryActions } from '@store/actions/entry-category.actions';
import { UserActions } from '@store/actions/profile.actions';
import { AppState } from '@store/reducers';
import { exhaustMap, map } from 'rxjs';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private store$ = inject(Store<AppState>);
  private userService = inject(UserService);
  private uiService = inject(UiService);

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUser),
      exhaustMap(() =>
        this.userService.get().pipe(
          map((result) => {
            return UserActions.loadUserSuccess({ data: result.data });
          }),
        ),
      ),
    );
  });

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      exhaustMap((action) =>
        this.userService.update(action.data).pipe(
          map((result) => {
            this.uiService.message.set('Usuario actualizado.');
            return UserActions.updateUserSuccess({ data: result.data });
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
          this.store$.dispatch(
            AccountActions.loadAccounts({ search: new SearchDto() }),
          );
          this.store$.dispatch(EntryCategoryActions.loadEntryCategories());
          this.store$.dispatch(UserActions.loadUser());
        }),
      ),
    { dispatch: false },
  );
}
