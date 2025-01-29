import { inject, Injectable } from '@angular/core';
import { RequestService } from './_request.service';
import { Account } from '@core/models/entities';
import { AccountCreateDto, PaginationMetaDto } from '@core/models/dtos';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private reqService = inject(RequestService);

  getAll(pagination?: PaginationMetaDto) {
    return this.reqService.getPaginatedList<Account>('accounts', pagination);
  }
  getById(accountId: string) {
    return this.reqService.get<Account>('accounts/' + accountId);
  }

  create(dto: AccountCreateDto) {
    return this.reqService.post<Account>('accounts', dto);
  }
  update(dto: Account, accountId: string) {
    return this.reqService.put<Account>(`accounts/${accountId}`, dto);
  }
  delete(accountId: string) {
    return this.reqService.delete(`accounts/${accountId}`);
  }
}
