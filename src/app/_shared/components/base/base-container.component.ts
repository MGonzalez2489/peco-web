import { Location } from '@angular/common';
import { inject } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { RouteData } from '@core/models/app';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { selectIsBusy, selectPageData, selectPeriod } from '@store/selectors';

export class BasePage {
  protected store$ = inject(Store<AppState>);
  protected isBusy = toSignal(this.store$.select(selectIsBusy), {
    initialValue: false,
  });
  protected location = inject(Location);
  protected period = toSignal(this.store$.select(selectPeriod));
  protected pageData = toSignal(this.store$.select(selectPageData), {
    initialValue: {
      pageTitle: '',
      filterByPeriod: false,
    } as RouteData,
  });

  protected navigateBack() {
    this.location.back();
  }
}
