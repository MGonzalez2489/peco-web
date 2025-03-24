/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, effect, inject, OnDestroy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UiActions } from '@store/actions/ui.actions';
import { AppState } from '@store/reducers';
import { selectErrorMessage } from '@store/selectors';
import { MessageModule } from 'primeng/message';
import { filter, Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-error-message',
  imports: [MessageModule],
  standalone: true,
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss',
})
export class ErrorMessageComponent implements OnDestroy {
  private store$ = inject(Store<AppState>);
  private router = inject(Router);
  private destroy$ = new Subject<void>();
  private timerSubscription: any;
  errorMessage = toSignal(this.store$.select(selectErrorMessage));
  lifeTime = 5000;

  constructor() {
    effect(() => {
      const message = this.errorMessage();
      if (message) {
        this.timerSubscription = timer(this.lifeTime)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.store$.dispatch(UiActions.removeErrorMessage());
          });
      }
    });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.store$.dispatch(UiActions.removeErrorMessage());
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  cleanMessageTimer(): void {
    if (this.timerSubscription) {
      this.store$.dispatch(UiActions.removeErrorMessage());
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }
}
