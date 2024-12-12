import { Component } from '@angular/core';
import { AuthService } from './_core/services';
import { CoreModule } from './_core/core.module';

@Component({
  selector: 'app-root',
  imports: [CoreModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  title = 'peco-web';
  constructor(private authService: AuthService) {}

  signIn() {
    this.authService
      .signIn({ email: 'test@test.com', password: '1234' })
      .subscribe((data) => {
        console.log('data', data);
      });
  }
}
