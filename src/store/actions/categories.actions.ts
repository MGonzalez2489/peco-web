import { EntryCategory } from '@core/models/api';
import { PaginationMetaModel } from '@core/models/responses';
import { createAction, props } from '@ngrx/store';

enum CATEGORY_ACTIONS {
  GET_CATEGORIES = '[CATEGORY] Get All Categories',
  GET_CATEGORIES_SUCCESS = '[CATEGORY] Get All Categories Success',
  GET_CATEGORIES_FAIL = '[CATEGORY] Get All Categories Fail',

  CLEAR_STATE = '[CATEGORY] Clear State',
}

export const GetAllCategoriesAction = createAction(
  CATEGORY_ACTIONS.GET_CATEGORIES,
  props<{ pageOptions?: PaginationMetaModel }>(),
);
export const GetAllCategoriesSuccessAction = createAction(
  CATEGORY_ACTIONS.GET_CATEGORIES_SUCCESS,
  props<{ categories: EntryCategory[] }>(),
);
export const GetAllCategoriesFailAction = createAction(
  CATEGORY_ACTIONS.GET_CATEGORIES_FAIL,
  props<{ payload: any }>(),
);
export const ClearStateAction = createAction(CATEGORY_ACTIONS.CLEAR_STATE);
