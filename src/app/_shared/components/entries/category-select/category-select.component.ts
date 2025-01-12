import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  Component,
  forwardRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Category } from '@core/models/api';
import { Store } from '@ngrx/store';
import { selectCategories } from '@store/selectors';
import { AppState } from '@store/states';

@Component({
  selector: 'app-category-select',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategorySelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,

      useExisting: forwardRef(() => CategorySelectComponent),
      multi: true,
    },
  ],
  templateUrl: './category-select.component.html',
  styleUrl: './category-select.component.scss',
})
export class CategorySelectComponent
  implements ControlValueAccessor, Validator, OnInit, OnChanges
{
  @Input() isRequired: boolean;
  private store$ = inject(Store<AppState>);
  value: Category;
  onChange = (value: Category) => {};
  onTouched = () => {};

  errorMessage = signal('');

  categories$ = this.store$.select(selectCategories);

  selectedCategory: FormControl;
  ngOnInit(): void {
    if (this.isRequired) {
      this.selectedCategory = new FormControl('-1', {
        validators: [Validators.required, this.validate],
      });
    } else {
      this.selectedCategory = new FormControl('-1', {});
    }
    this.updateErrorMessage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateValidators();
  }
  private updateValidators() {
    if (!this.isRequired) {
      this.selectedCategory.removeValidators(Validators.required);
    }
  }

  //ControlValueAccessor
  writeValue(obj: Category): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}
  select(value: MatSelectChange) {
    this.onChange(value.value);
  }
  markAsTouched(): void {
    this.onTouched();
  }
  //validator
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
  updateErrorMessage() {
    if (this.selectedCategory.hasError('required')) {
      this.errorMessage.set('Categoria requerida');
    } else {
      this.errorMessage.set('');
    }
  }
}
