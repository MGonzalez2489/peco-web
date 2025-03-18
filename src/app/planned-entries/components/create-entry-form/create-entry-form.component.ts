import { JsonPipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  PlannedEntryFrecuencyEndEnum,
  PlannedEntryFrecuencyEnum,
  PlannedEntryRecurrencyEnum,
} from '@core/enums';
import { PlannedEntryCreateDto } from '@core/models/dtos/planned-entry.dto';
import { EntryCategory, EntryType } from '@core/models/entities';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
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
import { PlannedEntryActions } from '@store/actions/planned-entry.actions';
import { AppState } from '@store/reducers';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

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
    EnumReversePipe,
    ButtonModule,
  ],
  templateUrl: './create-entry-form.component.html',
  styleUrl: './create-entry-form.component.scss',
})
export class CreatePlannedEntryFormComponent {
  private store$ = inject(Store<AppState>);
  private actions$ = inject(Actions);
  numberOfEventsOptions: string[] = [];
  frecuencyEnum = PlannedEntryFrecuencyEnum;
  recurrencyEnum = PlannedEntryRecurrencyEnum;
  frecuencyEndEnum = PlannedEntryFrecuencyEndEnum;
  //
  //
  readonly form = new FormGroup({
    //base form
    description: new FormControl<string | undefined>(undefined, {
      nonNullable: true,
    }),
    amount: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    entryType: new FormControl<EntryType | null>(null, [Validators.required]),
    category: new FormControl<EntryCategory | null>(null, [
      Validators.required,
    ]),
    startDate: new FormControl<Date | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),

    //recurency

    frecuency: new FormControl<string>('ONE_TIME', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    recurrency: new FormControl<string | undefined>(undefined, {
      nonNullable: true,
    }),
    frecuencyEnd: new FormControl<string | undefined>(undefined, {
      nonNullable: true,
    }),
    //frecuency reaction
    endDate: new FormControl<Date | undefined>(undefined, {
      nonNullable: true,
    }),
    numberOfEvents: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
    }),
  });

  readonly frecuencyFormS = toSignal(this.form.get('frecuency')!.valueChanges, {
    initialValue: this.form.value.frecuency!,
  });

  //

  constructor() {
    for (let i = 0; i < 31; i++) {
      this.numberOfEventsOptions.push(i.toString());
    }

    effect(() => {
      this.actions$
        .pipe(ofType(PlannedEntryActions.createPlannedEntrySuccess))
        .subscribe((entry) => {
          console.log('new entry', entry);
        });
    });
  }

  submit() {
    if (this.form.invalid) return;

    const newEntry: PlannedEntryCreateDto = {
      description: this.form.value.description,
      amount: this.form.value.amount!,
      categoryId: this.form.value.category!.publicId,
      entryTypeId: this.form.value.entryType!.publicId,
      frecuency: this.form.value.frecuency!,
      frecuencyEnd: undefined,
      startDate: this.form.value.startDate!.toISOString(),
      recurrency: undefined,
      endDate: undefined,
      dayOfWeek: undefined,
      dayOfMonth: undefined,
    };

    this.store$.dispatch(
      PlannedEntryActions.createPlannedEntry({ entry: newEntry }),
    );
  }
}
