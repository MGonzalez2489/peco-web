import { inject, Injectable } from '@angular/core';
import { RequestService } from './_request.service';
import { Account } from '@core/models/api';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private reqService = inject(RequestService);

  getAll() {
    return this.reqService.getList<Account>('accounts');
  }
}
