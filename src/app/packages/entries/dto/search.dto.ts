import { SearchDto } from '@core/models/dtos/search';

export class EntrySearchDto extends SearchDto {
  accountId?: string;

  description?: string;
  categoryId?: string;
  entryTypeId?: string;
  fromDate = '';
  toDate = '';
}
