//if one single event or is recurrent
export enum PlannedEntryFrecuencyEnum {
  ONE_TIME = 'One Time',
  RECURRENT = 'Recurrent',
}
//how often is repeated
export enum PlannedEntryRecurrencyEnum {
  DAILY = 'Daily',
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly',
}
//When the frecuency & recurrency ends
export enum PlannedEntryFrecuencyEndEnum {
  UNTIL_DATE = 'Until Date',
  NUMBER_OF_EVENTS = 'Number of Events',
  FOREVER = 'Forever',
}

//se ejecuta una vez o es recurrente
//RepeatEnum - Hasta cuando se repite
//FrecuencyEnum - Cada cuando se repite

//Frecuency | one time, recurrent
//Recurrency? |
//        Repeat | Daily, Weekly, Monthly, Yearly
//
//Frecuency-end?      | Number of events, until date, forever(never)
