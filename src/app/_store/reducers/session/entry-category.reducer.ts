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

  on(EntryCategoryActions.updateEntryCategorySuccess, (state, { category }) => {
    const updatedData = state.data.map((item) => {
      if (item.publicId === category.publicId) {
        // Actualizar la categoría principal
        return {
          ...item,
          name: category.name,
          isVisible: category.isVisible,
        };
      } else if (item.subCategories) {
        // Actualizar las subcategorías (si existen)
        const updatedSubCategories = item.subCategories.map((subCategory) => {
          if (subCategory.publicId === category.publicId) {
            // Actualizar la subcategoría
            return {
              ...subCategory,
              name: category.name,
              isVisible: category.isVisible,
            };
          }
          return subCategory; // Mantener la subcategoría sin cambios
        });

        // Crear un nuevo objeto item con las subcategorías actualizadas
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
