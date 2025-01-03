import { CatalogsState } from '@store/states';
import { createRehydrateReducer } from './_rehydrateReducer';
import { FEATURE_NAME } from '@store/constants';
import { on } from '@ngrx/store';

import * as CatalogsActionsGroup from './../actions/catalogs.actions';

const initialState: CatalogsState = {
  categories: [],
};

const _catalogsReducer = createRehydrateReducer(
  FEATURE_NAME.CATALOGS,
  initialState,

  on(
    CatalogsActionsGroup.GetCategoriesSuccessAction,
    (state, { categories }) => {
      return {
        ...state,
        categories,
      };
    },
  ),
);

export function CatalogsReducer(state: any, action: any) {
  return _catalogsReducer(state, action);
}
