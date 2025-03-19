import { JsonPipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PlannedEntryCreateDto } from '@core/models/dtos/planned-entry.dto';
import { EntryCategory, EntryType } from '@core/models/entities';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { PlannedEntryActions } from '@store/actions/planned-entry.actions';
import { AppState } from '@store/reducers';
import { PlannedEntryFrecuencyFormComponent } from 'app/planned-entries/components/planned-entry-frecuency-form/planned-entry-frecuency-form.component';
import { PlannedEntryGeneralFormComponent } from 'app/planned-entries/components/planned-entry-general-form/planned-entry-general-form.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-create-planned-entry',
  imports: [
    PlannedEntryGeneralFormComponent,
    PlannedEntryFrecuencyFormComponent,
    ButtonModule,
    ReactiveFormsModule,
    JsonPipe,
    CardModule,
  ],
  templateUrl: './create-planned-entry.component.html',
  styleUrl: './create-planned-entry.component.scss',
})
export class CreatePlannedEntryComponent {
  private store$ = inject(Store<AppState>);
  private actions$ = inject(Actions);
  private readonly frecuencyInitValue = 'ONE_TIME';
  readonly form = new FormGroup({
    //base form
    description: new FormControl<string | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
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

    frecuency: new FormControl<string>(this.frecuencyInitValue, {
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
    dayOfWeek: new FormControl(),
    dayOfMonth: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
    }),
  });

  constructor() {
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
      frecuencyEnd: this.form.value.frecuencyEnd,
      startDate: this.form.value.startDate!.toISOString(),
      recurrency: this.form.value.recurrency,
      endDate: this.form.value.endDate?.toISOString(),
      dayOfWeek: this.form.value.dayOfWeek,
      dayOfMonth: this.form.value.dayOfMonth,
    };

    this.store$.dispatch(
      PlannedEntryActions.createPlannedEntry({ entry: newEntry }),
    );
  }
  cancel() {
    console.log('cance');
  }
}
