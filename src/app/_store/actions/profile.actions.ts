import { UpdateUserDto } from '@core/models/dtos';
import { User } from '@core/models/entities';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load User': emptyProps(),
    'Load User Success': props<{ data: User }>(),
    'Load User Failure': props<{ payload: never }>(),

    'Update User': props<{ data: UpdateUserDto }>(),
    'Update User Success': props<{ data: User }>(),
    'Update User Failure': props<{ payload: never }>(),
  },
});
