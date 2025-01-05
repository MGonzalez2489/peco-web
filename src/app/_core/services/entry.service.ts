import { inject, Injectable } from '@angular/core';
import { RequestService } from './_request.service';
import { Entry } from '@core/models/api';
import { PaginationMetaModel } from '@core/models/responses';
import { EntryDto } from '@core/models/dtos';
import { CatEntryType } from '@core/models/api/catalogs';

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

  create(accountId: string, newEntry: EntryDto, type: CatEntryType) {
    let url = `entries/${accountId}/${type.name}`;
    return this.reqService.post<Entry>(url, newEntry);
  }
}
