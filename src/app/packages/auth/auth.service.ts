import { inject, Injectable } from '@angular/core';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
import { RequestService } from '@core/services/_request.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  request = inject(RequestService);

  login(data: LoginDto) {
    return this.request.post<TokenDto>('auth/login', data);
  }
  register(data: LoginDto) {
    return this.request.post<TokenDto>('auth/register', data);
  }
}
