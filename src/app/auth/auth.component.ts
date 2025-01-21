import { Component, inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
  RouterState,
  TitleStrategy,
} from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from '@shared/components';
import { AuthActions } from '@store/actions/auth.actions';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent extends BaseComponent implements OnInit {
  private titleStrategy = inject(TitleStrategy);
  private router = inject(Router);
  private actions$ = inject(Actions);
  title: string = 'Login';
  constructor() {
    super();
    //listen title changes
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.title = this.getTitle(
          this.router.routerState,
          this.router.routerState.root,
        );
      }
    });

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
  ngOnInit(): void {}
  getTitle(state: RouterState, parent: ActivatedRoute): string {
    let title = '';
    if (
      parent &&
      parent.snapshot &&
      this.titleStrategy.getResolvedTitleForRoute(parent.snapshot)
    ) {
      title = this.titleStrategy.getResolvedTitleForRoute(parent.snapshot);
    }
    if (state && parent && parent.firstChild) {
      title += this.getTitle(state, parent.firstChild);
    }
    return title;
  }
}
