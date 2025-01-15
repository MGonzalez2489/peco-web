import { inject, Injectable } from '@angular/core';
import { RequestService } from './_request.service';
import { PaginationMetaModel } from '@core/models/responses';
import { EntryCategory } from '@core/models/api';

@Injectable({
  providedIn: 'root',
})
export class EntryCategoryService {
  private reqService = inject(RequestService);
  constructor() {}

  getAll(pageOptions?: PaginationMetaModel) {
    return this.reqService.getPaginatedList<EntryCategory>(
      'entry-category',
      pageOptions,
    );
  }
}
