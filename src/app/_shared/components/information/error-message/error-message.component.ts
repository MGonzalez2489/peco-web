import { Component, effect, inject, OnDestroy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { UiActions } from '@store/actions/ui.actions';
import { AppState } from '@store/reducers';
import { selectErrorMessage } from '@store/selectors';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-error-message',
  imports: [MessageModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss',
})
export class ErrorMessageComponent implements OnDestroy {
  private store$ = inject(Store<AppState>);
  errorMessage = toSignal(this.store$.select(selectErrorMessage));
  lifeTime = 5000;

  private timerId: ReturnType<typeof setTimeout> | undefined;
  constructor() {
    effect(() => {
      const message = this.errorMessage();
      if (message) {
        this.cleanMessageTimer();
        this.timerId = setTimeout(() => {
          this.cleanMessage();
        }, this.lifeTime);
      }
    });
  }

  ngOnDestroy(): void {
    this.cleanMessageTimer();
  }
  cleanMessage() {
    this.store$.dispatch(UiActions.removeErrorMessage());
  }

  cleanMessageTimer() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = undefined;
    }
  }
}
