export interface PlannedEntryCreateDto {
  description: string | undefined;
  amount: number;
  //relations
  categoryId: string;
  entryTypeId: string;
  //recurency
  frecuency: string;
  recurrency: string | undefined;
  frecuencyEnd: string | undefined;
  startDate: string;
  endDate: string | undefined;
  dayOfWeek: string | undefined;
  dayOfMonth: number | undefined;
}
