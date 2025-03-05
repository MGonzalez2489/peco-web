import { EntryCategory } from '@core/models/entities';
import { createReducer, on } from '@ngrx/store';
import { EntryCategoryActions } from '@store/actions/entry-category.actions';

export const entryCategoryFeatureKey = 'entryCategory';

export interface EntryCategoryState {
  data: EntryCategory[];
}

const initialState: EntryCategoryState = {
  data: [],
};

export const EntryCategoryReducer = createReducer(
  initialState,

  on(
    EntryCategoryActions.loadEntryCategoriesSuccess,
    (state, { entryCategoryArray }) => {
      return { ...state, data: entryCategoryArray };
    },
  ),
  on(EntryCategoryActions.createEntryCategorySuccess, (state, { category }) => {
    if (!category.parentId) {
      return { ...state, data: [...state.data, category] };
    } else {
      const updatedData = state.data.map((item) => {
        if (item.publicId === category.parentId) {
          return {
            ...item,
            subCategories: [...(item.subCategories || []), category],
          };
          // item.subCategories = [...item.subCategories, category];
        }
        return item;
      });

      return {
        ...state,
        data: updatedData,
      };
    }
  }),

  on(EntryCategoryActions.updateEntryCategorySuccess, (state, { category }) => {
    const updatedData = state.data.map((item) => {
      if (item.publicId === category.publicId) {
        return {
          ...item,
          name: category.name,
          isVisible: category.isVisible,
        };
      } else if (item.subCategories) {
        const updatedSubCategories = item.subCategories.map((subCategory) => {
          if (subCategory.publicId === category.publicId) {
            return {
              ...subCategory,
              name: category.name,
              isVisible: category.isVisible,
            };
          }
          return subCategory; // Mantener la subcategoría sin cambios
        });

        return {
          ...item,
          subCategories: updatedSubCategories,
        };
      }
      return item; // Mantener el item sin cambios
    });

    return {
      ...state,
      data: updatedData,
    };
  }),
);
