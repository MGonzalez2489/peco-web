import { Injectable, inject } from '@angular/core';
import { AccountType, EntryStatus, EntryType } from '@core/models/entities';
import { RequestService } from './_request.service';
import { SearchDto } from '@core/models/dtos/search';

@Injectable({
  providedIn: 'root',
})
export class CatalogsService {
  private reqService = inject(RequestService);

  getEntryTypes(filters: SearchDto) {
    return this.reqService.getList<EntryType>('catalogs/entry-types', filters);
  }

  getAccountTypes(filters: SearchDto) {
    return this.reqService.getList<AccountType>(
      'catalogs/account-types',
      filters,
    );
  }

  getEntryStatus(filters: SearchDto) {
    return this.reqService.getList<EntryStatus>(
      'catalogs/entry-status',
      filters,
    );
  }
}
