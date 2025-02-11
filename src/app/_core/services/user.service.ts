import { inject, Injectable } from '@angular/core';
import { User } from '@core/models/entities';
import { RequestService } from './_request.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private reqService = inject(RequestService);

  get() {
    return this.reqService.get<User>('user');
  }
}
