import { inject, Injectable } from '@angular/core';
import { RequestService } from './_request.service';
import { User } from '@core/models/entities';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private reqService = inject(RequestService);

  get() {
    return this.reqService.get<User>('user');
  }
}
