//if one single event or is recurrent
export enum PlannedEntryFrecuencyEnum {
  ONE_TIME = 'Una vez',
  RECURRENT = 'Recurrente',
}
//how often is repeated
export enum PlannedEntryRecurrencyEnum {
  DAILY = 'Diario',
  WEEKLY = 'Semanal',
  MONTHLY = 'Mensual',
  YEARLY = 'Anual',
}
//When the frecuency & recurrency ends
export enum PlannedEntryFrecuencyEndEnum {
  UNTIL_DATE = 'Hasta la fecha',
  NUMBER_OF_EVENTS = 'Numero de eventos',
  FOREVER = 'Por siempre',
}

//se ejecuta una vez o es recurrente
//RepeatEnum - Hasta cuando se repite
//FrecuencyEnum - Cada cuando se repite

//Frecuency | one time, recurrent
//Recurrency? |
//        Repeat | Daily, Weekly, Monthly, Yearly
//
//Frecuency-end?      | Number of events, until date, forever(never)
