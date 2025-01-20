import { Component, inject } from '@angular/core';
import { AuthService } from '@core/services';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [ButtonModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);

  login(): void {
    this.authService
      .login({ email: 'test@test.com', password: '123456' })
      .subscribe((data) => {
        console.log('response:', data);
      });
  }
}
