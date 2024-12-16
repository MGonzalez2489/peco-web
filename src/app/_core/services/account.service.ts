import { inject, Injectable } from '@angular/core';
import { RequestService } from './_request.service';
import { Account } from '@core/models/api';
import { AccountDto } from '@core/models/dtos';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private reqService = inject(RequestService);

  getAll() {
    return this.reqService.getList<Account>('accounts');
  }
  create(dto: AccountDto) {
    return this.reqService.post<Account>('accounts', dto);
  }
}
