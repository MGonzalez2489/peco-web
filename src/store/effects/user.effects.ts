import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { GetAllAccountsAction } from '@store/actions/account.action';
import {
  RegisterSuccessAction,
  SigninSuccessAction,
} from '@store/actions/auth.action';
import { GetAllCategoriesAction } from '@store/actions/categories.actions';

import { AppState } from '@store/states';
import { map } from 'rxjs';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private store$ = inject(Store<AppState>);

  //get user info
  getUserInfo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SigninSuccessAction, RegisterSuccessAction),
        map(() => {
          this.store$.dispatch(GetAllAccountsAction());
          this.store$.dispatch(GetAllCategoriesAction({}));
        }),
      ),
    { dispatch: false },
  );
}
