/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivationEnd, Router, RouterOutlet } from '@angular/router';
import { RouteData } from '@core/models/app';
import { BasePage } from '@shared/components/base';
import { UiActions } from '@store/actions/ui.actions';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent extends BasePage {
  private destroyRef = inject(DestroyRef);
  constructor(private router: Router) {
    super();

    this.router.events
      .pipe(
        filter((event) => event instanceof ActivationEnd),
        map((event) => event.snapshot.data),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((data) => {
        this.mapRouteData(data);
      });
  }

  mapRouteData(data: any) {
    const response: RouteData = {
      pageTitle: '',
      filterByPeriod: false,
    };
    if (data['pageTitle']) {
      response.pageTitle = data['pageTitle'];
      if (data['filterByPeriod']) {
        response.filterByPeriod = Boolean(data['filterByPeriod']);
      }

      this.store$.dispatch(UiActions.setPageData({ data: response }));
    }
  }
}
