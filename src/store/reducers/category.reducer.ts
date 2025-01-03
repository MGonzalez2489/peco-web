import { on } from '@ngrx/store';
import { FEATURE_NAME } from '@store/constants';
import { createRehydrateReducer } from './_rehydrateReducer';
import * as CategoryActionsGroup from './../actions/categories.actions';
import { Category } from '@core/models/api';

const initialState: Category[] = [];

const _catalogsReducer = createRehydrateReducer(
  FEATURE_NAME.CATEGORIES,
  initialState,

  on(
    CategoryActionsGroup.GetAllCategoriesSuccessAction,
    (state, { categories }) => {
      return categories;
    },
  ),
);

export function CategoriesReducer(state: any, action: any) {
  return _catalogsReducer(state, action);
}
