import { inject, Injectable } from '@angular/core';
import { EntrySearchDto } from '@core/models/dtos/search';
import { Entry } from '@core/models/entities';
import { RequestService } from '@core/services/_request.service';
import { DateFilterDto, EntryKPIDto } from './dto';
import { EntryCreateDto } from './dto/entry.dto';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private reqService = inject(RequestService);

  search(search?: EntrySearchDto) {
    return this.reqService.getList<Entry>(`entries`, search);
  }

  create(newEntry: EntryCreateDto) {
    return this.reqService.post<Entry>(`entries`, newEntry);
  }

  getKPIs(dateFilter: DateFilterDto) {
    return this.reqService.get<EntryKPIDto>('entries/kpi', dateFilter);
  }
}
