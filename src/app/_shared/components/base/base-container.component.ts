import { Location } from '@angular/common';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { selectIsBusy } from '@store/selectors';

export class BasePage {
  protected store$ = inject(Store<AppState>);
  protected isBusy = toSignal(this.store$.select(selectIsBusy), {
    initialValue: false,
  });
  protected location = inject(Location);

  protected navigateBack() {
    this.location.back();
  }
}
