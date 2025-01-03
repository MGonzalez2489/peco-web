import { Category } from '@core/models/api';
import { PaginationMetaModel } from '@core/models/responses';
import { createAction, props } from '@ngrx/store';

enum CATALOGS_ACTIONS {
  GET_CATEGORIES = '[CATALOGS] Get Categories',
  GET_CATEGORIES_SUCCESS = '[CATALOGS] Get Categories Success',
  GET_CATEGORIES_FAIL = '[CATALOGS] Get Categories Fail',
}

export const GetCategoriesAction = createAction(
  CATALOGS_ACTIONS.GET_CATEGORIES,
  props<{ pageOptions?: PaginationMetaModel }>(),
);
export const GetCategoriesSuccessAction = createAction(
  CATALOGS_ACTIONS.GET_CATEGORIES_SUCCESS,
  props<{ categories: Category[] }>(),
);
export const GetCategoriesFailAction = createAction(
  CATALOGS_ACTIONS.GET_CATEGORIES_FAIL,
  props<{ payload: any }>(),
);
