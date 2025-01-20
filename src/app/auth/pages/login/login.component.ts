import { Component, inject } from '@angular/core';
import { LoginDto } from '@core/models/dtos';
import { Store } from '@ngrx/store';
import { AuthActions } from '@store/actions/auth.actions';
import { AppState } from '@store/reducers';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

const components = [ButtonModule, CardModule];

@Component({
  selector: 'app-login',
  imports: [...components],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  store$ = inject(Store<AppState>);

  login(): void {
    const dto: LoginDto = {
      email: 'test@test.com',
      password: '123456',
    };

    this.store$.dispatch(AuthActions.login({ data: dto }));
  }
}
