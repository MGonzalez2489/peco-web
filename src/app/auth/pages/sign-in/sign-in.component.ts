import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInDto } from '@core/models/dtos';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  standalone: false,
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  private authService = inject(AuthService);
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  submit(): void {
    if (this.form.invalid) return;

    this.authService.signIn(this.form.value as SignInDto).subscribe({
      next: (response) => {
        console.log('response', response);
      },
      error: (err) => console.log('error', err),
    });
  }
}
