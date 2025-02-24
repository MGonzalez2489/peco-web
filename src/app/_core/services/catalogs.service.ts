import { Injectable, inject } from '@angular/core';
import { EntryType } from '@core/models/entities';
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
    return this.reqService.getList<EntryType>('catalogs/account-types');
  }

  getEntryStatus() {
    return this.reqService.getList<EntryType>('catalogs/entry-status');
  }
}
