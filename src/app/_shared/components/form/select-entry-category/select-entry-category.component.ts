/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Component,
  effect,
  forwardRef,
  inject,
  Input,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { EntryCategory } from '@core/models/entities';
import { Store } from '@ngrx/store';
import { InvalidDirtyDirective } from '@shared/directives/forms';
import { AppState } from '@store/reducers';
import { selectVisibleEntryCategories } from '@store/selectors';
import { SelectItemGroup } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectChangeEvent, SelectModule } from 'primeng/select';

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
export class SelectEntryCategoryComponent
  implements ControlValueAccessor, Validator
{
  @Input()
  set directive(value: FormGroupDirective | undefined) {
    this.directiveSignal.set(value);
  }

  private store$ = inject(Store<AppState>);
  private directiveSignal = signal<FormGroupDirective | undefined>(undefined);
  groupedEntryCategories: SelectItemGroup[] = [];
  formControl = new FormControl();

  constructor() {
    effect(() => {
      this.store$.select(selectVisibleEntryCategories).forEach((data) => {
        this.createItemsGroup(data);
      });
    });

    effect(() => {
      const directive = this.directiveSignal();
      if (directive && directive.control) {
        const form = directive.control.get('category');
        if (form && form.validator) {
          this.formControl.setValidators(form.validator);
          this.formControl.updateValueAndValidity();
        }
      }
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

  onChange = (value: EntryCategory) => {
    this.writeValue(value);
  };
  onTouched = () => {};

  writeValue(obj: EntryCategory): void {
    this.formControl.setValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  validate(_control: AbstractControl): ValidationErrors | null {
    return this.formControl.validator?.(this.formControl) ?? null;
  }
}
