import { inject, Injectable } from '@angular/core';
import { RequestService } from './_request.service';
import { Entry } from '@core/models/api';
import { PaginationMetaModel } from '@core/models/responses';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private reqService = inject(RequestService);
  constructor() {}

  getEntriesByAccountId(accountId: string, pageOptions?: PaginationMetaModel) {
    return this.reqService.getList<Entry>(`entries/${accountId}`, pageOptions);
  }
}
