import { AsyncPipe } from '@angular/common';
import { Component, forwardRef, inject, Input, signal } from '@angular/core';
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { EntryType } from '@core/models/entities';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { selectCatEntryTypes } from '@store/selectors';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { Observable, tap } from 'rxjs';
import { BaseFormControl } from '../base-form-control';
@Component({
  selector: 'app-select-entry-type',
  imports: [
    FloatLabelModule,
    AsyncPipe,
    SelectModule,
    ReactiveFormsModule,
    AsyncPipe,
    SelectModule,
    ButtonModule,
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
export class SelectEntryTypeComponent extends BaseFormControl {
  @Input()
  mode: 'select' | 'button' = 'button';
  private store$ = inject(Store<AppState>);
  protected override inpId = 'entryType';

  protected selectedSeverity = signal<'success' | 'danger'>('danger');
  //
  entryTypes$: Observable<EntryType[]> = this.store$
    .select(selectCatEntryTypes)
    .pipe(
      tap((values) => {
        this.writeValue(values[0]);
        this.onChange(values[0]);
      }),
    );
  //

  select(event: SelectChangeEvent) {
    this.onChange(event.value);
  }
  selectButton(value: EntryType) {
    this.determineButtonSeverity(value);
    this.writeValue(value);
    this.onChange(value);
  }
  private determineButtonSeverity(value: EntryType) {
    this.selectedSeverity.set(value.name === 'income' ? 'success' : 'danger');
  }
}
