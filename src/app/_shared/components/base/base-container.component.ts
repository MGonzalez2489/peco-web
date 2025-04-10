import { Location } from '@angular/common';
import { inject } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { DeviceSizeEnum } from '@core/enums';
import { RouteData } from '@core/models/app';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import {
  selectIsBusy,
  selectPageData,
  selectPeriod,
  selectPlatformInfo,
} from '@store/selectors';

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
  protected platformInfo = toSignal(this.store$.select(selectPlatformInfo), {
    initialValue: {
      windowHeight: 0,
      windowWidth: 0,
      platform: '',
      platformName: '',
      platformVersion: '',
      deviceSize: DeviceSizeEnum.large, // Inicializar con un valor por defecto
    },
  });

  protected navigateBack() {
    this.location.back();
  }
}
