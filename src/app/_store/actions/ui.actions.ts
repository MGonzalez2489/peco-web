import { DateFilterOptionsEnum } from '@core/enums';
import { DateFilterDto } from '@entries/dto';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UiActions = createActionGroup({
  source: 'Ui',
  events: {
    'Set Busy on': emptyProps(),
    'Set Busy off': emptyProps(),
    'Set SideBar State': emptyProps(),

    'Set Error Message': props<{ message: string }>(),
    'Remove Error Message': emptyProps(),

    'Set Period': props<{ option: DateFilterOptionsEnum }>(),
    'Set Period Success': props<{ newPeriod: DateFilterDto }>(),
  },
});
