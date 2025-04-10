import { RouteData } from '@core/models/app';
import { Platform } from '@core/models/app/platform.model';
import { DateFilterDto } from '@entries/dto';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UiActions = createActionGroup({
  source: 'Ui',
  events: {
    'Set Busy on': emptyProps(),
    'Set Busy off': emptyProps(),

    'Set Page Data': props<{ data: RouteData }>(),
    'Set Platform Info': props<{ info: Platform }>(),

    'Set SideBar State': emptyProps(),

    'Set Error Message': props<{ message: string }>(),
    'Remove Error Message': emptyProps(),

    'Set Period': props<{ newPeriod: DateFilterDto }>(),

    'Set Loading session': props<{ loading: boolean }>(),
    'Set Loaded session': props<{ loaded: boolean }>(),
  },
});
