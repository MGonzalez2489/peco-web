import { inject, Injectable } from '@angular/core';
import { Account } from '@core/models/api';
import { ResultListModel, ResultModel } from '@core/models/responses';
import { AccountService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  CreateAccounSuccesstAction,
  CreateAccountAction,
  CreateAccountFailAction,
  GetAllAccountsAction,
  GetAllAccountsFailAction,
  GetAllAccountsSuccessAction,
} from '@store/actions/account.action';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable()
export class AccountEffects {
  private actions$ = inject(Actions);
  private accountService = inject(AccountService);

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
}