import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '@settings/profile/profile.service';
import { UserActions } from '@store/actions/profile.actions';
import { exhaustMap, map } from 'rxjs';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

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
            return UserActions.updateUserSuccess({ data: result.data });
          }),
        ),
      ),
    );
  });
}
