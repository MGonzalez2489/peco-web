import {
  PlannedEntryFrecuencyEndEnum,
  PlannedEntryFrecuencyEnum,
  PlannedEntryRecurrencyEnum,
} from '@core/enums';

export interface PlannedEntryCreateDto {
  description: string | undefined;
  amount: number;
  //relations
  categoryId: string;
  entryTypeId: string;
  //recurency
  frecuency: PlannedEntryFrecuencyEnum;
  recurrency: PlannedEntryRecurrencyEnum;
  frecuencyEnd: PlannedEntryFrecuencyEndEnum;
  startDate: string;
  endDate: string;
  dayOfWeek: string;
  dayOfMonth: number;
}
