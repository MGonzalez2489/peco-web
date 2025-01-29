import { inject, Injectable } from '@angular/core';
import { EntryCategory } from '@core/models/entities';
import { RequestService } from './_request.service';
import { PagMetaReqDto } from '@core/models/dtos';

@Injectable({
  providedIn: 'root',
})
export class EntryCategoryService {
  private reqService = inject(RequestService);
  constructor() {}

  getAll(pageOptions?: PagMetaReqDto) {
    return this.reqService.getList<EntryCategory>(
      'entry-category',
      pageOptions,
    );
  }
}
