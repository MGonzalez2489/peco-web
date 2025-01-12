import { inject, Injectable } from '@angular/core';
import { RequestService } from './_request.service';
import { Entry } from '@core/models/api';
import { PaginationMetaModel } from '@core/models/responses';
import { EntryDto } from '@core/models/dtos';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private reqService = inject(RequestService);
  constructor() {}

  getEntriesByAccountId(accountId: string, pageOptions?: PaginationMetaModel) {
    return this.reqService.getPaginatedList<Entry>(
      `entries/${accountId}`,
      pageOptions,
    );
  }

  create(accountId: string, newEntry: EntryDto) {
    return this.reqService.post<Entry>(`entries/${accountId}/entry`, newEntry);
  }
}
