import { Injectable, inject } from '@angular/core';
import { RequestService } from './_request.service';
import { EntryType } from '@core/models/entities';

@Injectable({
  providedIn: 'root',
})
export class CatalogsService {
  private reqService = inject(RequestService);
  constructor() {}

  getEntryTipes() {
    return this.reqService.getList<EntryType>('catalogs/entry-types');
  }
}
