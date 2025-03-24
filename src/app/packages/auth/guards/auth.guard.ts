import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { TokenDto } from '@auth/dto/token.dto';
import { select, Store } from '@ngrx/store';
import { AuthActions } from '@store/actions/auth.actions';
import { AppState } from '@store/reducers';
import { selectToken } from '@store/selectors';
import { map } from 'rxjs';

export const AuthGuard: CanActivateFn = () => {
  const store$ = inject(Store<AppState>);

  return store$.pipe(
    select(selectToken),
    map((token: TokenDto) => {
      if (token && token.access_token && token.expiresAt) {
        //validate expiration
        const expDate = new Date(token.expiresAt);
        const nowDate = Date.now();

        if (expDate.getTime() > nowDate) {
          return true;
        }

        store$.dispatch(AuthActions.logout());
        return false;
      }

      store$.dispatch(AuthActions.logout());
      return false;
    }),
  );
};
