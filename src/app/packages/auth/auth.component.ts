import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { BasePageComponent } from '@shared/components/base';
import { PageTitleComponent } from '@shared/components/layout';
import { AuthActions } from '@store/actions/auth.actions';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, PageTitleComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent extends BasePageComponent {
  constructor() {
    super();
    effect(() => {
      this.actions$
        .pipe(
          ofType(AuthActions.registerSuccess, AuthActions.loginSuccess),
          takeUntil(this.destroy$),
        )
        .subscribe(() => {
          this.router.navigate(['/app']);
        });
    });
  }
}
