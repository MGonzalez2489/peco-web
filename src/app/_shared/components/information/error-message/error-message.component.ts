import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiActions } from '@store/actions/ui.actions';
import { AppState } from '@store/reducers';
import { selectErrorMessage } from '@store/selectors';
import { MessageModule } from 'primeng/message';
import { tap } from 'rxjs';

@Component({
  selector: 'app-error-message',
  imports: [MessageModule, AsyncPipe],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss',
})
export class ErrorMessageComponent {
  store$ = inject(Store<AppState>);
  error$ = this.store$.select(selectErrorMessage).pipe(
    tap((value) => {
      if (value) this.cleanMessageTtimer();
    }),
  );

  lifeTime = 5000;
  cleanMessage() {
    this.store$.dispatch(UiActions.removeErrorMessage());
  }
  cleanMessageTtimer() {
    setTimeout(() => {
      this.cleanMessage();
    }, this.lifeTime);
  }
}
