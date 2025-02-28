import { Component, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { PageTitleComponent } from '@shared/components/layout';
import { AuthActions } from '@store/actions/auth.actions';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, PageTitleComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  private router = inject(Router);
  private actions$ = inject(Actions);

  constructor() {
    effect(() => {
      this.actions$
        .pipe(ofType(AuthActions.registerSuccess, AuthActions.loginSuccess))
        .subscribe(() => {
          this.router.navigate(['/home']);
        });
    });
  }
}
