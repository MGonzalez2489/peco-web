import { createSelector } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { SessionState } from '@store/reducers/session';

const sessionState = (state: AppState) => state.session;

export const selectEntryCategories = createSelector(
  sessionState,
  (state: SessionState) => state.entryCategories.data,
);

export const selectVisibleEntryCategories = createSelector(
  sessionState,
  (state: SessionState) => {
    return state.entryCategories.data
      .filter((category) => category.isVisible)
      .map((category) => ({
        ...category,
        subCategories: category.subCategories
          ? category.subCategories.filter(
              (subCategory) => subCategory.isVisible,
            )
          : [],
      }));
  },
);
