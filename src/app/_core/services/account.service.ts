import { inject, Injectable } from '@angular/core';
import { RequestService } from './_request.service';
import { Account } from '@core/models/entities';
import { PaginationMetaDto } from '@core/models/dtos';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private reqService = inject(RequestService);

  getAll(pagination?: PaginationMetaDto) {
    return this.reqService.getList<Account>('accounts', pagination);
  }
  create(dto: Account) {
    return this.reqService.post<Account>('accounts', dto);
  }
  update(dto: Account, accountId: string) {
    return this.reqService.put<Account>(`accounts/${accountId}`, dto);
  }

  getById(accountId: string) {
    return this.reqService.get<Account>('accounts/' + accountId);
  }
}
