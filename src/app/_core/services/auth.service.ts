import { inject } from '@angular/core';
import { RequestService } from './_request.service';
import { LoginDto, TokenDto } from '@core/models/dtos';

export class AuthService {
  request = inject(RequestService);

  login(data: LoginDto) {
    return this.request.post<TokenDto>('auth/signIn', data);
  }
  register(data: LoginDto) {
    return this.request.post<TokenDto>('auth/register', data);
  }
}
