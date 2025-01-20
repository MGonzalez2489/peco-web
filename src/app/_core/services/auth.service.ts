import { inject } from '@angular/core';
import { RequestService } from './_request.service';

export class AuthService {
  request = inject(RequestService);
}
