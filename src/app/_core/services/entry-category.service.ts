import { inject, Injectable } from '@angular/core';
import { EntryCategory } from '@core/models/entities';
import { RequestService } from './_request.service';
import { SearchDto } from '@core/models/dtos/search';

@Injectable({
  providedIn: 'root',
})
export class EntryCategoryService {
  private reqService = inject(RequestService);
  constructor() {}

  getAll(search?: SearchDto) {
    return this.reqService.getList<EntryCategory>('entry-category', search);
  }
}
