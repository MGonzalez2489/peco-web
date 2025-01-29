import { inject, Injectable } from '@angular/core';
import { EntryCreateDto, PagMetaReqDto } from '@core/models/dtos';
import { Entry } from '@core/models/entities';
import { RequestService } from './_request.service';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private reqService = inject(RequestService);

  getAll(pagination?: PagMetaReqDto) {
    return this.reqService.getList<Entry>(`entries`, pagination);
  }
  // getById(accountId: string) {
  //   return this.reqService.get<Account>('accounts/' + accountId);
  // }
  //

  create(accountId: string, newEntry: EntryCreateDto) {
    return this.reqService.post<Entry>(`entries/${accountId}/entry`, newEntry);
  }
}
