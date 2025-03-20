import { AsyncPipe } from '@angular/common';
import { Component, forwardRef, inject, Input } from '@angular/core';
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
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
import { BaseFormControl } from '../base-form-control';
@Component({
  selector: 'app-select-entry-type',
  imports: [
    FloatLabelModule,
    AsyncPipe,
    SelectModule,
    ReactiveFormsModule,
    AsyncPipe,
    SelectButtonModule,
    SelectModule,
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
  selectButton(event: SelectButtonChangeEvent) {
    this.onChange(event.value);
  }
}
