import { AccountCreateDto, AccountSearchDto } from '@accounts/dto';
import { inject, Injectable } from '@angular/core';
import { Account } from '@core/models/entities';
import { RequestService } from '@core/services/_request.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private reqService = inject(RequestService);

  getAll(search: AccountSearchDto) {
    return this.reqService.getList<Account>('accounts', search);
  }
  getById(accountId: string) {
    return this.reqService.get<Account>('accounts/' + accountId);
  }

  create(dto: AccountCreateDto) {
    return this.reqService.post<Account>('accounts', dto);
  }
  update(dto: AccountCreateDto, accountId: string) {
    return this.reqService.put<Account>(`accounts/${accountId}`, dto);
  }
  delete(accountId: string) {
    return this.reqService.delete(`accounts/${accountId}`);
  }
}
