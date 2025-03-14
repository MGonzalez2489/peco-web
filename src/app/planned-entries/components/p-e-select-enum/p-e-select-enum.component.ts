/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  forwardRef,
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
} from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-p-e-select-enum',
  imports: [SelectModule, FloatLabelModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PESelectEnumComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,

      useExisting: forwardRef(() => PESelectEnumComponent),
      multi: true,
    },
  ],
  templateUrl: './p-e-select-enum.component.html',
  styleUrl: './p-e-select-enum.component.scss',
})
export class PESelectEnumComponent
  implements ControlValueAccessor, Validator, OnInit, OnChanges
{
  @Input() enum: any; // El enum a utilizar
  @Input() placeholder = 'Seleccione una opción';
  @Input() label = 'Opciones';
  @Input() showClear = false;

  options: SelectItem[] = [];
  formControl = new FormControl();

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit(): void {
    this.generateOptions();
    this.formControl.valueChanges.subscribe((value) => {
      this.onChange(value);
      this.onTouched();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['enum'] && !changes['enum'].firstChange) {
      this.generateOptions();
      if (this.formControl.value) {
        this.formControl.setValue(this.formControl.value);
      }
    }
  }
  private generateOptions() {
    this.options = Object.keys(this.enum).map((key) => ({
      label: this.enum[key],
      value: key,
    }));
  }

  //
  writeValue(value: any): void {
    this.formControl.setValue(value, { emitEvent: false });
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
    return this.formControl.errors;
  }
}
