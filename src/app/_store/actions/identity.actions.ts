import { User } from '@core/models/entities';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const IdentityActions = createActionGroup({
  source: 'Identity',
  events: {
    'Load Identity': emptyProps(),
    'Load Identity Success': props<{ data: User }>(),
    'Load Identity Failure': props<{ payload: any }>(),
  },
});
