import { Injectable } from '@angular/core';
import { RequestService } from './_request.service';
import { SignInDto, TokenDto } from '@core/models/dtos';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private reqService: RequestService) {}

  //TODO: Define input model
  register(data: SignInDto) {
    return this.reqService.post<TokenDto>('auth/register', data);
  }
  secure(data: SignInDto) {
    return this.reqService.post<TokenDto>('auth/secure', data);
  }
  signIn(data: SignInDto) {
    return this.reqService.post<TokenDto>('auth/signIn', data);
  }
}
