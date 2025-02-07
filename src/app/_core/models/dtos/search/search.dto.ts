import { SortEvent } from 'primeng/api';
import { PaginationMetaDto } from '../responses/ResultList.dto';
import { PaginatorState } from 'primeng/paginator';

/**
 * Dto used tu request information to the API,
 * It includes pagination data and filters
 */
export class SearchDto {
  /**
   * Page to show
   */
  page: number = 1;
  /**
   * Items per page
   */

  take: number = 10;
  /**
   * identify if we want to request all data
   */

  showAll: boolean = false;
  /**
   * Order to show the data
   */

  order: 'ASC' | 'DESC' = 'DESC';
  /**
   * Property used to order
   */

  orderBy?: string = 'createdAt';
  /**
   * Generic field used to find by contains
   */
  hint?: string;

  /**
   *@param event SortEvent obj with user indications
   * // Handle Soring
   */
  setSort(event: SortEvent) {
    const newOrder = event.order === 1 ? 'ASC' : 'DESC';
    if (this.orderBy != event.field || this.order != newOrder) {
      this.orderBy = event.field;
      this.order = newOrder;
    }
  }
  /**
   *@param event PaginatorState obj with user indications
   *@param currentPagination Current pagination info comming from last api response
   * // Handle Pagination
   */

  setPagination(event: PaginatorState, currentPagination: PaginationMetaDto) {
    this.page = event.page! + 1;
    this.take = event.rows!;
    if (event.rows! === currentPagination.itemCount) {
      this.showAll = true;
    }
  }
}

export class EntrySearchDto extends SearchDto {
  accountId?: string;

  description?: string;
  categoryId?: string;
  entryTypeId?: string;
  fromDate?: string;
  toDate?: string;
}
