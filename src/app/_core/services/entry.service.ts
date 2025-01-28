import { inject, Injectable } from '@angular/core';
import { PaginationMetaDto } from '@core/models/dtos';
import { Entry } from '@core/models/entities';
import { RequestService } from './_request.service';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private reqService = inject(RequestService);

  getAll(pagination?: PaginationMetaDto) {
    return this.reqService.getList<Entry>(`entries`, pagination);
  }
  // getById(accountId: string) {
  //   return this.reqService.get<Account>('accounts/' + accountId);
  // }
  //
  // create(dto: AccountCreateDto) {
  //   return this.reqService.post<Account>('accounts', dto);
  // }
  // update(dto: Account, accountId: string) {
  //   return this.reqService.put<Account>(`accounts/${accountId}`, dto);
  // }
  // delete(accountId: string) {
  //   return this.reqService.delete(`accounts/${accountId}`);
  // }
}
