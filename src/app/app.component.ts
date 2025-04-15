/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivationEnd, RouterOutlet } from '@angular/router';
import { DeviceSizeEnum, ViewSizeEnum } from '@core/enums';
import { RouteData } from '@core/models/app';
import { Platform } from '@core/models/app/platform.model';
import { BasePageComponent } from '@shared/components/base';
import { UiActions } from '@store/actions/ui.actions';
import { ButtonModule } from 'primeng/button';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent
  extends BasePageComponent
  implements AfterViewInit, OnDestroy
{
  private destroyRef = inject(DestroyRef);
  private resizeObserver?: ResizeObserver;
  readonly platformId = inject(PLATFORM_ID);

  constructor() {
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

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        const newPlatformInfo: Platform = {
          windowWidth: cr.width,
          windowHeight: cr.height,
          platform: this.platformId.toString(),
          platformName: this.getBrowserName(),
          platformVersion: this.getBrowserVersion(),
          deviceSize: this.getDeviceSize(cr.width),
          viewSize: ViewSizeEnum.large,
        };

        if (
          newPlatformInfo.deviceSize === DeviceSizeEnum.large ||
          newPlatformInfo.deviceSize === DeviceSizeEnum.xLarge
        ) {
          newPlatformInfo.viewSize = ViewSizeEnum.large;
        } else {
          newPlatformInfo.viewSize = ViewSizeEnum.small;
        }

        this.store$.dispatch(
          UiActions.setPlatformInfo({ info: newPlatformInfo }),
        );
      }
    });
    this.resizeObserver.observe(document.documentElement);
  }
  getDeviceSize(width: number): DeviceSizeEnum {
    // Breakpoints de Tailwind CSS
    if (width < 640) {
      return DeviceSizeEnum.xSmall;
    } else if (width >= 640 && width < 768) {
      return DeviceSizeEnum.small;
    } else if (width >= 768 && width < 1024) {
      return DeviceSizeEnum.medium;
    } else if (width >= 1024 && width < 1280) {
      return DeviceSizeEnum.large;
    } else {
      return DeviceSizeEnum.xLarge;
    }
  }

  override ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  mapRouteData(data: any): void {
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

  getBrowserName(): string {
    const agent = window.navigator.userAgent.toLowerCase();
    const browser =
      agent.indexOf('edge') > -1
        ? 'Microsoft Edge'
        : agent.indexOf('edg') > -1
          ? 'Chromium-based Edge'
          : agent.indexOf('opr') > -1
            ? 'Opera'
            : agent.indexOf('chrome') > -1
              ? 'Chrome'
              : agent.indexOf('trident') > -1
                ? 'Internet Explorer'
                : agent.indexOf('firefox') > -1
                  ? 'Firefox'
                  : agent.indexOf('safari') > -1
                    ? 'Safari'
                    : 'other';

    return browser;
  }

  getBrowserVersion(): string {
    // Especifica el tipo de retorno
    const userAgent = navigator.userAgent;
    const match =
      userAgent.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i,
      ) || [];

    if (/trident/i.test(match[1])) {
      const rvMatch = userAgent.match(/\brv[ :]+(\d+)/) || [];
      return 'IE ' + (rvMatch[1] || '');
    }

    if (match[1] === 'Chrome') {
      const edgeMatch = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
      if (edgeMatch) {
        return edgeMatch.slice(1).join(' ').replace('OPR', 'Opera');
      }
    }

    const versionMatch = match[2]
      ? [match[1], match[2]]
      : [navigator.appName, navigator.appVersion, '-?'];
    const version = userAgent.match(/version\/(\d+)/i);
    if (version) {
      versionMatch.splice(1, 1, version[1]);
    }

    return versionMatch.join(' ');
  }

  //dev bar
  setBusy() {
    const isB = this.isBusy();
    if (isB) {
      this.store$.dispatch(UiActions.setBusyOff());
    } else this.store$.dispatch(UiActions.setBusyOn());
  }
}
