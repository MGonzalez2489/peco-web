import { AsyncPipe } from '@angular/common';
import { Component, forwardRef, inject, Input, OnChanges } from '@angular/core';
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
import { EntryType } from '@core/models/entities';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { selectCatEntryTypes } from '@store/selectors';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import {
  SelectButtonChangeEvent,
  SelectButtonModule,
} from 'primeng/selectbutton';
import { Observable, tap } from 'rxjs';
@Component({
  selector: 'app-select-entry-type',
  imports: [
    FloatLabelModule,
    AsyncPipe,
    SelectModule,
    ReactiveFormsModule,
    AsyncPipe,
    SelectButtonModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectEntryTypeComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,

      useExisting: forwardRef(() => SelectEntryTypeComponent),
      multi: true,
    },
  ],
  templateUrl: './select-entry-type.component.html',
  styleUrl: './select-entry-type.component.scss',
})
export class SelectEntryTypeComponent
  implements ControlValueAccessor, Validator, OnChanges
{
  //
  store$ = inject(Store<AppState>);
  entryTypes$: Observable<EntryType[]> = this.store$
    .select(selectCatEntryTypes)
    .pipe(
      tap((values) => {
        //default selected
        this.writeValue(values[0]);
        this.onChange(values[0]);
      }),
    );
  //
  @Input() isRequired = false;

  selectedEntryType = new FormControl();
  onChange = (value: EntryType) => {
    this.selectedEntryType.setValue(value);
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  writeValue(obj: any): void {
    this.selectedEntryType.setValue(obj);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  }
  selectButton(event: SelectButtonChangeEvent) {
    this.onChange(event.value);
  }

  private updateValidators() {
    if (!this.isRequired) {
      this.selectedEntryType.removeValidators(Validators.required);
    }
  }
}
