import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignInDto } from '@core/models/dtos';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  submit(): void {
    if (this.form.invalid) return;

    const data: SignInDto = {
      email: this.form.value.email!,
      password: this.form.value.password!,
    };
    this.authService.register(data).subscribe({
      next: (response) => {
        console.log('response', response);
      },
      error: (err) => console.log('error', err),
    });
  }
}
