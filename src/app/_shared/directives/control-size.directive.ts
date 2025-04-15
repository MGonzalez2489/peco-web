import {
  Directive,
  effect,
  EffectRef,
  HostBinding,
  inject,
  OnDestroy,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ViewSizeEnum } from '@core/enums';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { selectPlatformInfo } from '@store/selectors';

@Directive({
  selector: '[appControlSize]',
  standalone: true,
})
export class ControlSizeDirective implements OnDestroy {
  @HostBinding('class.p-inputtext-lg') isLargeText = false;
  @HostBinding('class.p-inputfield-lg') isLargeField = false;

  private store$ = inject(Store<AppState>);
  private platformInfo = toSignal(this.store$.select(selectPlatformInfo));

  effectRef: EffectRef;

  constructor() {
    this.effectRef = effect(() => {
      const pInfo = this.platformInfo();
      if (pInfo) {
        const isMobileVIew = pInfo.viewSize === ViewSizeEnum.small;
        this.isLargeText = isMobileVIew;
        this.isLargeField = isMobileVIew;
      }
    });
  }
  ngOnDestroy(): void {
    this.effectRef.destroy();
  }
}
