import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthActions } from '@store/actions/auth.actions';
import { AppState } from '@store/reducers';
import { selectToken } from '@store/selectors';
import { map } from 'rxjs';

export const AuthGuard: CanActivateFn = () => {
  const store$ = inject(Store<AppState>);

  return store$.pipe(
    select(selectToken),
    map((token: string | null) => {
      if (token) {
        return true;
      }

      store$.dispatch(AuthActions.logout());
      return false;
    }),
  );
};
