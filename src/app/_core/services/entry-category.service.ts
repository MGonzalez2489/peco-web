import { inject, Injectable } from '@angular/core';
import { EntryCategory } from '@core/models/entities';
import { RequestService } from './_request.service';
import { PaginationMetaDto } from '@core/models/dtos';

@Injectable({
  providedIn: 'root',
})
export class EntryCategoryService {
  private reqService = inject(RequestService);
  constructor() {}

  getAll(pageOptions?: PaginationMetaDto) {
    return this.reqService.getPaginatedList<EntryCategory>(
      'entry-category',
      pageOptions,
    );
  }
}
