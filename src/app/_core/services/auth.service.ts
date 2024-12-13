import { Injectable } from '@angular/core';
import { RequestService } from './_request.service';
import { SignInDto } from '@core/models/dtos';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private reqService: RequestService) {}

  //TODO: Define input model
  register(data: SignInDto) {
    return this.reqService.post('auth/register', data);
  }
  secure(data: SignInDto) {
    return this.reqService.post('auth/secure', data);
  }
  signIn(data: SignInDto) {
    return this.reqService.post('auth/signIn', data);
  }
}
