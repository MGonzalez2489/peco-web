import { inject, Injectable } from '@angular/core';
import { RequestService } from './_request.service';
import { CatEntryType } from '@core/models/api/catalogs';

@Injectable({
  providedIn: 'root',
})
export class CatalogsService {
  private reqService = inject(RequestService);
  constructor() {}

  getEntryTipes() {
    return this.reqService.getList<CatEntryType>('catalogs/entry-types');
  }
}
