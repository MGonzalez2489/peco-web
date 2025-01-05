import { CatalogsState } from '@store/states';
import { createRehydrateReducer } from './_rehydrateReducer';
import { FEATURE_NAME } from '@store/constants';
import { on } from '@ngrx/store';

import * as CatalogsActionsGroup from './../actions/catalogs.actions';

const initialState: CatalogsState = {
  entryTypes: [],
};

const _catalogsReducer = createRehydrateReducer(
  FEATURE_NAME.CATALOGS,
  initialState,

  on(
    CatalogsActionsGroup.GetEntryTypeSuccessAction,
    (state, { entryTypes }) => {
      return {
        ...state,
        entryTypes,
      };
    },
  ),
);

export function CatalogsReducer(state: any, action: any) {
  return _catalogsReducer(state, action);
}
