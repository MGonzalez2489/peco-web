/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, forwardRef, inject, Input, OnInit } from '@angular/core';
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
import { BaseComponent } from '@shared/components/_base.component';
import { InvalidDirtyDirective } from '@shared/directives/forms';
import { AppState } from '@store/reducers';
import { selectVisibleEntryCategories } from '@store/selectors';
import { SelectItemGroup } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { takeUntil } from 'rxjs';

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
  extends BaseComponent
  implements ControlValueAccessor, Validator, OnInit
{
  @Input()
  directive: FormGroupDirective | undefined;

  private store$ = inject(Store<AppState>);
  groupedEntryCategories: SelectItemGroup[] = [];

  formControl = new FormControl();

  constructor() {
    super();
    this.store$
      .select(selectVisibleEntryCategories)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.createItemsGroup(data);
      });
  }

  ngOnInit(): void {
    //map validators
    const validators = this.rootControl?.validator;
    if (validators) {
      this.formControl.setValidators(validators);
      this.formControl.updateValueAndValidity();
    }
  }
  get rootControl() {
    if (this.directive && this.directive.control) {
      const form = this.directive.control.get('category');
      return form;
    }
    return null;
  }

  createItemsGroup(entryCategories: EntryCategory[]) {
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

  //ValueAccesor
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
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }
  //validator
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(_control: AbstractControl): ValidationErrors | null {
    return this.formControl.validator?.(this.formControl) ?? null;
  }
}
