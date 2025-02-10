import {
  Component,
  forwardRef,
  inject,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { EntryCategory } from '@core/models/entities';
import { Store } from '@ngrx/store';
import { BaseComponent } from '@shared/components/_base.component';
import { AppState } from '@store/reducers';
import { selectEntryCategories } from '@store/selectors';
import { SelectItemGroup } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-select-entry-category',
  imports: [FloatLabelModule, SelectModule, ReactiveFormsModule],
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
  implements ControlValueAccessor, Validator, OnInit, OnChanges
{
  store$ = inject(Store<AppState>);
  groupedEntryCategories: SelectItemGroup[] = [
    { label: 'Unknown', value: null, items: [] },
  ];
  entryCategory: EntryCategory[] = [];
  constructor() {
    super();
    this.store$
      .select(selectEntryCategories)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.entryCategory = data;
        this.createItemsGroup(data);
      });
  }
  ngOnInit(): void {
    if (this.isRequired) {
      this.selectedCategory = new FormControl('-1', {
        validators: [Validators.required, this.validate],
      });
    } else {
      this.selectedCategory = new FormControl('-1', {});
    }

    //
    this.selectedCategory.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.onChange(data);
      });
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

  //value accesor

  selectedCategory = new FormControl();
  @Input() isRequired: boolean = false;
  onChange = (value: EntryCategory) => {
    this.selectedCategory.setValue(value);
  };
  onTouched = () => {};
  writeValue(obj: any): void {
    this.selectedCategory.setValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return { required: true };
    }
    if (control.value === '-1') {
      return { required: true };
    }

    return null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.onChange = fn;
  }

  ngOnChanges(): void {
    this.updateValidators();
  }
  select(event: SelectChangeEvent) {
    this.onChange(event.value);
    // this.selectedCategory.setValue(event.value);
  }
  private updateValidators() {
    if (!this.isRequired) {
      this.selectedCategory.removeValidators(Validators.required);
    }
  }
}
