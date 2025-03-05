import { inject, Injectable } from '@angular/core';
import { SearchDto } from '@core/models/dtos/search';
import { EntryCategory } from '@core/models/entities';
import { RequestService } from './_request.service';
import {
  EntryCategoryCreateDto,
  EntryCategoryUpdateDto,
} from '@core/models/dtos';

@Injectable({
  providedIn: 'root',
})
export class EntryCategoryService {
  private reqService = inject(RequestService);

  getAll(search?: SearchDto) {
    return this.reqService.getList<EntryCategory>('entry-category', search);
  }
  create(category: EntryCategoryCreateDto) {
    return this.reqService.post<EntryCategory>(`entry-category`, category);
  }

  update(categoryId: string, dto: EntryCategoryUpdateDto) {
    return this.reqService.put<EntryCategory>(
      `entry-category/${categoryId}`,
      dto,
    );
  }
}
