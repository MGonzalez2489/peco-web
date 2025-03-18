// import {
//   PlannedEntryFrecuencyEnum,
//   PlannedEntryRecurrencyEnum,
//   PlannedEntryFrecuencyEndEnum,
// } from '@core/enums/planned-entry.enum';
import { BaseEntity } from './_base.entity';

export interface PlannedEntry extends BaseEntity {
  description: string;

  amount: number;

  categoryId: string;

  entryTypeId: string;

  //recurrency
  // frecuency: PlannedEntryFrecuencyEnum;
  // recurrency: PlannedEntryRecurrencyEnum;
  // frecuencyEnd: PlannedEntryFrecuencyEndEnum;

  startDate: string;
  endDate: string;
  dayOfWeek: string;
  dayOfMonth: number;
}
