import { JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  PlannedEntryFrecuencyEndEnum,
  PlannedEntryFrecuencyEnum,
  PlannedEntryRecurrencyEnum,
} from '@core/enums';
import {
  SelectEntryCategoryComponent,
  SelectEntryTypeComponent,
  SelectEnumComponent,
} from '@shared/components/form';
import {
  InvalidDirtyDirective,
  ValidationErrorDirective,
} from '@shared/directives/forms';
import { EnumReversePipe } from '@shared/pipes';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { RecurrenceFormComponent } from '../recurrence-form/recurrence-form.component';

@Component({
  selector: 'app-planned-create-entry-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    InputNumberModule,
    InvalidDirtyDirective,
    ValidationErrorDirective,
    SelectEntryTypeComponent,
    SelectEntryCategoryComponent,
    JsonPipe,
    CardModule,
    SelectEnumComponent,
    DatePickerModule,
    SelectModule,
    ButtonModule,
    RecurrenceFormComponent,
    EnumReversePipe,
  ],
  templateUrl: './create-entry-form.component.html',
  styleUrl: './create-entry-form.component.scss',
})
export class CreatePlannedEntryFormComponent {
  @Input()
  form!: FormGroup;
  frecuencyEnum = PlannedEntryFrecuencyEnum;
  recurrencyEnum = PlannedEntryRecurrencyEnum;
  frecuencyEndEnum = PlannedEntryFrecuencyEndEnum;
  //
  //

  //
}
