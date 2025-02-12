import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from '@shared/components';
import { PageTitleComponent } from '@shared/components/layout';
import { AuthActions } from '@store/actions/auth.actions';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, PageTitleComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent extends BaseComponent {
  private router = inject(Router);
  private actions$ = inject(Actions);

  constructor() {
    super();

    //redirect
    this.actions$
      .pipe(
        ofType(AuthActions.registerSuccess, AuthActions.loginSuccess),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }
}
