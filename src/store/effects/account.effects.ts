import { inject, Injectable } from '@angular/core';
import { Account } from '@core/models/api';
import { ResultListModel, ResultModel } from '@core/models/responses';
import { AccountService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  ClearStateAction,
  CreateAccounSuccesstAction,
  CreateAccountAction,
  CreateAccountFailAction,
  GetAccountByIdAction,
  GetAccountByIdFailAction,
  GetAccountByIdSuccessAction,
  GetAllAccountsAction,
  GetAllAccountsFailAction,
  GetAllAccountsSuccessAction,
} from '@store/actions/account.action';
import { LogoutAction } from '@store/actions/auth.action';
import { mergeMap, map, catchError, of } from 'rxjs';
import { AppState } from '@store/states';

@Injectable()
export class AccountEffects {
  private actions$ = inject(Actions);
  private accountService = inject(AccountService);
  private store$ = inject(Store<AppState>);

  //GET ALL
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllAccountsAction),
      mergeMap(() => {
        return this.accountService.getAll().pipe(
          map((response: ResultListModel<Account>) => {
            return GetAllAccountsSuccessAction({ accounts: response.data });
          }),
          catchError((err) => {
            return of(GetAllAccountsFailAction({ payload: err }));
          }),
        );
      }),
    ),
  );
  //CREATE
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateAccountAction),
      mergeMap((data) => {
        return this.accountService.create(data.accountDto).pipe(
          map((response: ResultModel<Account>) => {
            return CreateAccounSuccesstAction({ account: response.data });
          }),
          catchError((err) => {
            return of(CreateAccountFailAction({ payload: err }));
          }),
        );
      }),
    ),
  );

  //GET BY ID
  getAccountById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAccountByIdAction),
      mergeMap((data) => {
        return this.accountService.getById(data.accountId).pipe(
          map((response: ResultModel<Account>) => {
            return GetAccountByIdSuccessAction({ account: response.data });
          }),
          catchError((err) => {
            return of(GetAccountByIdFailAction({ payload: err }));
          }),
        );
      }),
    ),
  );

  //not dispatchables
  clearState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LogoutAction),
        map(() => {
          this.store$.dispatch(ClearStateAction());
        }),
      ),
    { dispatch: false },
  );
}
