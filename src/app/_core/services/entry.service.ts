import { inject, Injectable } from '@angular/core';
import { EntryCreateDto } from '@core/models/dtos';
import { Entry } from '@core/models/entities';
import { RequestService } from './_request.service';
import { EntrySearchDto } from '@core/models/dtos/search';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private reqService = inject(RequestService);

  search(search?: EntrySearchDto) {
    return this.reqService.getList<Entry>(`entries`, search);
  }

  create(newEntry: EntryCreateDto) {
    return this.reqService.post<Entry>(`entries/new`, newEntry);
  }
}
