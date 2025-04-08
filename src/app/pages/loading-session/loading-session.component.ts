import { Component, effect, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { BasePage } from '@shared/components/base';
import { UiActions } from '@store/actions/ui.actions';
import { selectIsLoadedSession } from '@store/selectors';

@Component({
  selector: 'app-loading-session',
  imports: [],
  templateUrl: './loading-session.component.html',
  styleUrl: './loading-session.component.scss',
})
export class LoadingSessionComponent extends BasePage implements OnInit {
  private router = inject(Router);
  sessionLoaded = toSignal(this.store$.select(selectIsLoadedSession), {
    initialValue: false,
  });

  constructor() {
    super();
    effect(() => {
      const isLoaded = this.sessionLoaded();
      if (isLoaded) {
        this.router.navigateByUrl('/home');
      }
    });
  }

  ngOnInit(): void {
    const today = new Date();
    const sDate = new Date(today.setDate(today.getDate() - today.getDay()));
    sDate.setHours(0, 0, 0);

    const eDate = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    eDate.setHours(23, 59, 59);

    this.store$.dispatch(
      UiActions.setPeriod({
        newPeriod: {
          from: sDate.toLocaleString(),
          to: eDate.toLocaleString(),
          type: 'WEEK',
        },
      }),
    );
  }
}
