import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { selectAccounts } from '@store/selectors';
import { AccountCardComponent } from 'app/accounts/components/account-card/account-card.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [AccountCardComponent, ButtonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private store$ = inject(Store<AppState>);
  accounts = toSignal(this.store$.select(selectAccounts));
}
