export interface EntryCreateDto {
  amount: number;
  description: string;
  categoryId: string;
  entryTypeId: string;
  accountId?: string;
}
