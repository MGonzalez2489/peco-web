import { Injectable, inject } from '@angular/core';
import { AccountType, EntryStatus, EntryType } from '@core/models/entities';
import { RequestService } from './_request.service';

@Injectable({
  providedIn: 'root',
})
export class CatalogsService {
  private reqService = inject(RequestService);

  getEntryTypes() {
    return this.reqService.getList<EntryType>('catalogs/entry-types');
  }

  getAccountTypes() {
    return this.reqService.getList<AccountType>('catalogs/account-types');
  }

  getEntryStatus() {
    return this.reqService.getList<EntryStatus>('catalogs/entry-status');
  }
}
