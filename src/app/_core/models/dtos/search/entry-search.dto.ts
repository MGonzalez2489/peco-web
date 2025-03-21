import { SearchDto } from './search.dto';

export class EntrySearchDto extends SearchDto {
  accountId?: string;

  description?: string;
  categoryId?: string;
  entryTypeId?: string;
  fromDate = '';
  toDate = '';
}
