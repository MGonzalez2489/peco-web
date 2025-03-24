import { inject, Injectable } from '@angular/core';
import { RequestService } from '../../_core/services/_request.service';
import { PlannedEntryCreateDto } from '@planned-entries/dto/planned-entry.dto';
import { PlannedEntry } from '@core/models/entities';
import { SearchDto } from '@core/models/dtos/search';

@Injectable({
  providedIn: 'root',
})
export class PlannedEntryService {
  private reqService = inject(RequestService);

  getAll(search?: SearchDto) {
    return this.reqService.getList<PlannedEntry>('planned-entry', search);
  }

  create(dto: PlannedEntryCreateDto) {
    return this.reqService.post<PlannedEntry>('planned-entry', dto);
  }
}
