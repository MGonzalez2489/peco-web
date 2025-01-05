import { inject, Injectable } from '@angular/core';
import { RequestService } from './_request.service';
import { Category } from '@core/models/api';
import { PaginationMetaModel } from '@core/models/responses';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private reqService = inject(RequestService);
  constructor() {}

  getAll(pageOptions?: PaginationMetaModel) {
    return this.reqService.getPaginatedList<Category>(
      'categories',
      pageOptions,
    );
  }
}
