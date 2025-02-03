import { inject, Injectable } from '@angular/core';
import { EntryCreateDto, SearchDto } from '@core/models/dtos';
import { Entry } from '@core/models/entities';
import { RequestService } from './_request.service';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private reqService = inject(RequestService);

  getAll(search?: SearchDto) {
    return this.reqService.getList<Entry>(`entries`, search);
  }

  create(accountId: string, newEntry: EntryCreateDto) {
    return this.reqService.post<Entry>(`entries/${accountId}/entry`, newEntry);
  }

  getEntriesByAccountId(accountId: string, search?: SearchDto) {
    return this.reqService.getList<Entry>(`entries/${accountId}`, search);
  }
}
