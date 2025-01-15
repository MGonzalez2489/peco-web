import { on } from '@ngrx/store';
import { FEATURE_NAME } from '@store/constants';
import { createRehydrateReducer } from './_rehydrateReducer';
import * as CategoryActionsGroup from '../actions/categories.actions';
import { EntryCategory } from '@core/models/api';

const initialState: EntryCategory[] = [];

const _entryCategories = createRehydrateReducer(
  FEATURE_NAME.ENTRYCATEGORY,
  initialState,

  on(
    CategoryActionsGroup.GetAllCategoriesSuccessAction,
    (state, { categories }) => {
      return categories;
    },
  ),
  on(CategoryActionsGroup.ClearStateAction, () => {
    return [];
  }),
);

export function EntryCategoryReducer(state: any, action: any) {
  return _entryCategories(state, action);
}
