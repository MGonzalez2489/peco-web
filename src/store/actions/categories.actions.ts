import { Category } from '@core/models/api';
import { PaginationMetaModel } from '@core/models/responses';
import { createAction, props } from '@ngrx/store';

enum CATEGORY_ACTIONS {
  GET_CATEGORIES = '[CATALOGS] Get All Categories',
  GET_CATEGORIES_SUCCESS = '[CATALOGS] Get All Categories Success',
  GET_CATEGORIES_FAIL = '[CATALOGS] Get All Categories Fail',
}

export const GetAllCategoriesAction = createAction(
  CATEGORY_ACTIONS.GET_CATEGORIES,
  props<{ pageOptions?: PaginationMetaModel }>(),
);
export const GetAllCategoriesSuccessAction = createAction(
  CATEGORY_ACTIONS.GET_CATEGORIES_SUCCESS,
  props<{ categories: Category[] }>(),
);
export const GetAllCategoriesFailAction = createAction(
  CATEGORY_ACTIONS.GET_CATEGORIES_FAIL,
  props<{ payload: any }>(),
);
