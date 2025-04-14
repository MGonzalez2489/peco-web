import { Location } from '@angular/common';
import { Component, effect, inject, OnDestroy, signal } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceSizeEnum, ViewSizeEnum } from '@core/enums';
import { RouteData } from '@core/models/app';
import { Platform } from '@core/models/app/platform.model';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import {
  selectIsBusy,
  selectPageData,
  selectPeriod,
  selectPlatformInfo,
} from '@store/selectors';
import { Subject } from 'rxjs';

export abstract class Base {
  private internalStore$ = inject(Store<AppState>);
  isBusy = toSignal(this.internalStore$.select(selectIsBusy), {
    initialValue: false,
  });
  platformInfo = toSignal(this.internalStore$.select(selectPlatformInfo), {
    initialValue: {
      windowHeight: 0,
      windowWidth: 0,
      platform: '',
      platformName: '',
      platformVersion: '',
      deviceSize: DeviceSizeEnum.large, // Inicializar con un valor por defecto
      viewSize: ViewSizeEnum.large,
    } as Platform,
  });
  isDesktopView = signal<boolean>(false);
  isMobileView = signal<boolean>(false);

  constructor() {
    effect(() => {
      const pInfo = this.platformInfo();
      if (pInfo.viewSize === ViewSizeEnum.large) {
        this.isDesktopView.set(true);
        this.isMobileView.set(false);
      }
      if (pInfo.viewSize === ViewSizeEnum.small) {
        this.isDesktopView.set(false);
        this.isMobileView.set(true);
      }
    });
  }
}

@Component({ template: '' })
export class BasePageComponent extends Base implements OnDestroy {
  private activatedRoute = inject(ActivatedRoute);

  protected store$ = inject(Store<AppState>);
  protected location = inject(Location);
  protected destroy$ = new Subject<void>();
  protected actions$ = inject(Actions);
  protected router = inject(Router);
  protected pageData = toSignal(this.store$.select(selectPageData), {
    initialValue: {
      pageTitle: '',
      filterByPeriod: false,
    } as RouteData,
  });

  protected navigateBack() {
    this.location.back();
  }
  protected period = toSignal(this.store$.select(selectPeriod));

  constructor() {
    super();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getParamFromRoute(param: string) {
    return this.activatedRoute.snapshot.params[param];
  }
}
export class BaseComponent extends Base {}
