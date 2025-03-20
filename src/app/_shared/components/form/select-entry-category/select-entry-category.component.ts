import { Component, effect, forwardRef, inject } from '@angular/core';
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { EntryCategory } from '@core/models/entities';
import { Store } from '@ngrx/store';
import { InvalidDirtyDirective } from '@shared/directives/forms';
import { AppState } from '@store/reducers';
import { selectVisibleEntryCategories } from '@store/selectors';
import { SelectItemGroup } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { BaseFormControl } from '../base-form-control';

@Component({
  selector: 'app-select-entry-category',
  imports: [
    FloatLabelModule,
    SelectModule,
    ReactiveFormsModule,
    InvalidDirtyDirective,
  ],
  templateUrl: './select-entry-category.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectEntryCategoryComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,

      useExisting: forwardRef(() => SelectEntryCategoryComponent),
      multi: true,
    },
  ],
  styleUrl: './select-entry-category.component.scss',
})
export class SelectEntryCategoryComponent extends BaseFormControl {
  private store$ = inject(Store<AppState>);
  protected override inpId = 'category';
  groupedEntryCategories: SelectItemGroup[] = [];

  constructor() {
    super();
    effect(() => {
      this.store$.select(selectVisibleEntryCategories).forEach((data) => {
        this.createItemsGroup(data);
      });
    });
  }
  createItemsGroup(entryCategories: EntryCategory[]) {
    this.groupedEntryCategories = [];
    entryCategories.forEach((entryCat) => {
      if (entryCat.subCategories && entryCat.subCategories.length > 0) {
        const newGroup: SelectItemGroup = {
          label: entryCat.name,
          value: entryCat,
          items: entryCat.subCategories?.map((f) => {
            return {
              label: f.name,
              value: f,
            };
          }),
        };
        this.groupedEntryCategories.push(newGroup);
      } else {
        if (!this.groupedEntryCategories[0]) {
          this.groupedEntryCategories[0] = {
            label: 'Categorias',
            value: null,
            items: [],
          };
        }
        this.groupedEntryCategories[0].items.push({
          label: entryCat.name,
          value: entryCat,
        });
      }
    });
  }

  select(event: SelectChangeEvent) {
    this.formControl.markAsDirty();
    this.formControl.markAsTouched();
    this.onChange(event.value);
  }
}
