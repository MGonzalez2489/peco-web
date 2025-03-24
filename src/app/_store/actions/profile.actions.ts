import { User } from '@core/models/entities';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UpdateUserDto } from '@settings/dto/user.dto';

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
