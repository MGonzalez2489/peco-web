import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UiActions = createActionGroup({
  source: 'Ui',
  events: {
    'Set Busy on': emptyProps(),
    'Set Busy off': emptyProps(),
    'Set SideBar Open': props<{ isOpen: boolean }>(),

    'Set Error Message': props<{ message: string }>(),
    'Remove Error Message': emptyProps(),
  },
});
