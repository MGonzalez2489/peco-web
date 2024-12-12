import { Injectable } from '@angular/core';
import { RequestService } from './_request.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private reqService: RequestService) {}

  //TODO: Define input model
  register(data: { email: string; password: string }) {
    return this.reqService.post('auth/register', data);
  }
  secure(data: { email: string; password: string }) {
    return this.reqService.post('auth/secure', data);
  }
  signIn(data: { email: string; password: string }) {
    return this.reqService.post('auth/signIn', data);
  }
}
