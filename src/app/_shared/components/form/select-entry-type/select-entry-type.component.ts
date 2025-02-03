import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  Component,
  forwardRef,
  inject,
  Input,
  OnChanges,
  OnInit,
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
import { EntryType } from '@core/models/entities';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { selectCatEntryTypes } from '@store/selectors';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-select-entry-type',
  imports: [
    FloatLabelModule,
    AsyncPipe,
    SelectModule,
    ReactiveFormsModule,
    AsyncPipe,
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
  implements ControlValueAccessor, Validator, OnInit, OnChanges
{
  //
  store$ = inject(Store<AppState>);
  entryTypes$: Observable<EntryType[]> =
    this.store$.select(selectCatEntryTypes);
  //
  @Input() isRequired: boolean = false;

  selectedEntryType = new FormControl();
  onChange = (value: EntryType) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    this.selectedEntryType.setValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}
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
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.updateValidators();
  }
  select(event: SelectChangeEvent) {
    this.onChange(event.value);
  }

  private updateValidators() {
    if (!this.isRequired) {
      this.selectedEntryType.removeValidators(Validators.required);
    }
  }
}
