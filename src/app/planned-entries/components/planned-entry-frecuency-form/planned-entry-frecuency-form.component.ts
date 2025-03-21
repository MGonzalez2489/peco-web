import { Component, effect, Input, OnInit, signal } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  DaysOfWeekEnum,
  PlannedEntryFrecuencyEndEnum,
  PlannedEntryFrecuencyEnum,
  PlannedEntryRecurrencyEnum,
} from '@core/enums';
import { SelectEnumComponent } from '@shared/components/form';
import {
  InvalidDirtyDirective,
  ValidationErrorDirective,
} from '@shared/directives/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-planned-entry-frecuency-form',
  imports: [
    ReactiveFormsModule,
    SelectEnumComponent,
    FloatLabelModule,
    DatePickerModule,
    ValidationErrorDirective,
    InvalidDirtyDirective,
    SelectModule,
    InputNumberModule,
  ],
  templateUrl: './planned-entry-frecuency-form.component.html',
  styleUrl: './planned-entry-frecuency-form.component.scss',
})
export class PlannedEntryFrecuencyFormComponent implements OnInit {
  //inputs
  @Input()
  form!: FormGroup;
  @Input()
  formDirective!: FormGroupDirective;
  //enums
  frecuencyEnum = PlannedEntryFrecuencyEnum;
  frecuencyEndEnum = PlannedEntryFrecuencyEndEnum;
  recurrencyEnum = PlannedEntryRecurrencyEnum;
  daysOfWeek = DaysOfWeekEnum;
  //signals
  frecuency = signal<string | null>(null);
  frecuencyEffect = effect(() => {
    this.handleFrecuencyChange(this.frecuency());
  });
  recurrency = signal<string | null>(null);
  recurrencyEffect = effect(() => {
    this.handleRecurrencyChange(this.recurrency());
  });
  frecuencyEnd = signal<string | null>(null);
  frecuencyEndEffect = effect(() => {
    this.handleFrecuencyEndChange(this.frecuencyEnd());
  });
  //variables
  daysOfMonth: string[] = [];

  constructor() {
    for (let i = 1; i < 31; i++) {
      this.daysOfMonth.push(i.toString());
    }
  }

  ngOnInit(): void {
    if (this.form) {
      this.frecuency.set(this.form.get('frecuency')?.value); //ONE_TIME,RECURRENT
      this.form.get('frecuency')?.valueChanges.subscribe((value) => {
        this.frecuency.set(value); // Actualiza el Signal con cada cambio
      });
      this.recurrency.set(this.form.get('recurrency')?.value); //daily, weekly...
      this.form.get('recurrency')?.valueChanges.subscribe((value) => {
        this.recurrency.set(value); // Actualiza el Signal con cada cambio
      });
      this.frecuencyEnd.set(this.form.get('frecuencyEnd')?.value); // Inicializa el Signal

      this.form.get('frecuencyEnd')?.valueChanges.subscribe((value) => {
        this.frecuencyEnd.set(value); // Actualiza el Signal con cada
      });
    }
  }

  private handleFrecuencyEndChange(frecuency: string | null) {
    if (!frecuency) return;

    this.form.controls['numberOfEvents'].setValue(undefined);
    this.form.controls['numberOfEvents'].clearValidators();
    this.form.controls['endDate'].setValue(undefined);
    this.form.controls['endDate'].clearValidators();

    if (frecuency === 'UNTIL_DATE') {
      this.form.controls['endDate'].setValidators(Validators.required);
    }
    if (frecuency === 'NUMBER_OF_EVENTS') {
      this.form.controls['numberOfEvents'].setValidators(Validators.required);
    }

    this.form.controls['numberOfEvents'].updateValueAndValidity();
    this.form.controls['endDate'].updateValueAndValidity();
  }

  private handleRecurrencyChange(recurrency: string | null) {
    if (!recurrency) return;

    this.form.controls['dayOfWeek'].setValue(undefined);
    this.form.controls['dayOfMonth'].setValue(undefined);
    // this.form.controls['endDate'].setValue(undefined);

    this.form.controls['dayOfWeek'].clearValidators();
    this.form.controls['dayOfMonth'].clearValidators();
    // this.form.controls['endDate'].clearValidators();

    switch (recurrency) {
      case 'WEEKLY':
        //set
        this.form.controls['dayOfWeek'].setValidators(Validators.required);
        //remove
        break;
      case 'MONTHLY':
        this.form.controls['dayOfMonth'].setValidators(Validators.required);
        break;
      case 'YEARLY':
        // this.form.controls['endDate'].setValidators(Validators.required);
        break;
      default:
        break;
    }
    this.form.controls['dayOfWeek'].updateValueAndValidity();
    this.form.controls['dayOfMonth'].updateValueAndValidity();
    // this.form.controls['endDate'].updateValueAndValidity();
  }
  private handleFrecuencyChange(frecuency: string | null) {
    if (!frecuency) return;

    if (frecuency === 'RECURRENT') {
      this.form.controls['recurrency'].setValidators(Validators.required);
      this.form.controls['frecuencyEnd'].setValue('FOREVER');
    }
    if (frecuency === 'ONE_TIME') {
      this.form.controls['recurrency'].setValue(undefined);
      this.form.controls['recurrency'].clearValidators();
      this.form.controls['frecuencyEnd'].setValue(undefined);
    }
    this.form.controls['recurrency'].updateValueAndValidity();
  }
}
