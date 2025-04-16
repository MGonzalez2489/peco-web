import { AccountSearchDto } from '@accounts/dto';
import { inject, Injectable } from '@angular/core';
import { SearchDto } from '@core/models/dtos/search';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AccountActions } from '@store/actions/account.actions';
import { CatalogsActions } from '@store/actions/catalogs.actions';
import { EntryCategoryActions } from '@store/actions/entry-category.actions';
import { UserActions } from '@store/actions/profile.actions';
import { UiActions } from '@store/actions/ui.actions';
import { AppState } from '@store/reducers';
import { selectIsLoadedSession } from '@store/selectors';
import { forkJoin, mergeMap, of, take, tap, withLatestFrom } from 'rxjs';

@Injectable()
export class UiEffects {
  private actions$ = inject(Actions);
  private store$ = inject(Store<AppState>);

  loadSession$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UiActions.setPeriod),
        tap(() => {
          this.store$.dispatch(UiActions.setLoadingSession({ loading: true }));
        }),
        withLatestFrom(this.store$.select(selectIsLoadedSession)),
        mergeMap(([period, isLoadedSession]) => {
          if (isLoadedSession) {
            return of(null);
          }

          const search = new SearchDto();
          search.showAll = true;
          search.from = period.newPeriod.from;
          search.to = period.newPeriod.to;
          search.period = period.newPeriod.type;

          // Dispatch all the actions to load data
          this.store$.dispatch(
            CatalogsActions.loadEntryType({ filters: search }),
          );
          this.store$.dispatch(
            CatalogsActions.loadAccountType({ filters: search }),
          );
          this.store$.dispatch(
            CatalogsActions.loadEntryStatus({ filters: search }),
          );
          this.store$.dispatch(UserActions.loadUser());

          this.store$.dispatch(
            EntryCategoryActions.loadEntryCategories({
              search,
            }),
          );

          this.store$.dispatch(
            AccountActions.loadAccounts({
              search: { ...search } as AccountSearchDto,
            }),
          );

          // Create observables for the completion of each dispatched action
          const loadEntryType$ = this.actions$.pipe(
            ofType(
              CatalogsActions.loadEntryTypeSuccess,
              CatalogsActions.loadEntryTypeFailure,
            ),
            take(1),
          );
          const loadAccountType$ = this.actions$.pipe(
            ofType(
              CatalogsActions.loadAccountTypeSuccess,
              CatalogsActions.loadAccountTypeFailure,
            ),
            take(1),
          );
          const loadEntryStatus$ = this.actions$.pipe(
            ofType(
              CatalogsActions.loadEntryStatusSuccess,
              CatalogsActions.loadEntryStatusFailure,
            ),
            take(1),
          );
          const loadUser$ = this.actions$.pipe(
            ofType(UserActions.loadUserSuccess, UserActions.loadUserFailure),
            take(1),
          );
          const loadAccounts$ = this.actions$.pipe(
            ofType(
              AccountActions.loadAccountsSuccess,
              AccountActions.loadAccountsFailure,
            ),
            take(1),
          );
          const loadEntryCategories$ = this.actions$.pipe(
            ofType(
              EntryCategoryActions.loadEntryCategoriesSuccess,
              EntryCategoryActions.loadEntryCategoriesFailure,
            ),
            take(1),
          );

          // Use forkJoin to wait for all completion observables to emit
          const fk = forkJoin([
            loadEntryType$,
            loadAccountType$,
            loadEntryStatus$,
            loadUser$,
            loadAccounts$,
            loadEntryCategories$,
          ]);

          fk.subscribe({
            complete: () => {
              this.store$.dispatch(
                UiActions.setLoadingSession({ loading: false }),
              );
              this.store$.dispatch(
                UiActions.setLoadedSession({ loaded: true }),
              );
            },
          });
          return fk;
        }),
      );
    },
    { dispatch: false },
  );
}
