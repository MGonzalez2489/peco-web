import { Component, effect, forwardRef, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { DateFilterOptionsEnum } from '@core/enums';
import { DateFilterDto } from '@entries/dto';
import { Store } from '@ngrx/store';
import { SelectEnumComponent } from '@shared/components/form';
import { BaseFormControl } from '@shared/components/form/base-form-control';
import { UiActions } from '@store/actions/ui.actions';
import { AppState } from '@store/reducers';
import { selectPeriod } from '@store/selectors';
import { SelectModule } from 'primeng/select';

interface DateValues {
  sDate: Date;
  eDate: Date;
}

@Component({
  selector: 'app-entry-filter-date',
  imports: [SelectModule, ReactiveFormsModule, SelectEnumComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFilterDateComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,

      useExisting: forwardRef(() => EntryFilterDateComponent),
      multi: true,
    },
  ],
  templateUrl: './entry-filter-date.component.html',
  styleUrl: './entry-filter-date.component.scss',
})
export class EntryFilterDateComponent
  extends BaseFormControl
  implements OnInit
{
  //TODO: The start day of the week is sunday, implement an option to select that
  private store$ = inject(Store<AppState>);
  enum = DateFilterOptionsEnum;
  protected period = toSignal(this.store$.select(selectPeriod));
  protected selectedValue = toSignal(this.formControl.valueChanges, {
    initialValue: 'WEEK',
  });

  constructor() {
    super();

    effect(() => {
      const newPeriod = this.period();
      if (newPeriod) {
        this.formControl.setValue(newPeriod.type);
      }
    });

    effect(() => {
      const newValue = this.selectedValue();
      if (newValue) {
        this.processSelection(newValue);
      }
    });
  }

  processSelection(key: string) {
    key = key.toLowerCase();
    let dateValues;
    switch (key) {
      case 'today':
        dateValues = this.generateTodayFilter();
        break;
      case 'week':
        dateValues = this.generateWeekFilter();
        break;
      case 'month':
        dateValues = this.generateMonthFilter();
        break;
      case 'year':
        dateValues = this.generateYearFilter();
        break;
      default:
        break;
    }

    if (dateValues) this.assignvalues(dateValues!);
  }
  private generateTodayFilter(): DateValues {
    const sDate: Date = new Date();
    sDate.setHours(0, 0, 0);

    const eDate: Date = new Date();
    eDate.setHours(23, 59, 59);
    return { sDate, eDate };
  }
  private generateWeekFilter() {
    const today = new Date();
    const sDate = new Date(today.setDate(today.getDate() - today.getDay()));
    sDate.setHours(0, 0, 0);

    const eDate = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    eDate.setHours(23, 59, 59);
    return { sDate, eDate };
  }
  private generateMonthFilter() {
    const today = new Date();
    const sDate = new Date(today.getFullYear(), today.getMonth(), 1);
    sDate.setHours(0, 0, 0);

    const eDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    eDate.setHours(23, 59, 59);

    return { sDate, eDate };
  }
  private generateYearFilter() {
    const today = new Date();
    const sDate = new Date(today.getFullYear(), 0, 1);

    sDate.setHours(0, 0, 0);

    const eDate = new Date(today.getFullYear(), 11, 31);
    eDate.setHours(23, 59, 59);

    return { sDate, eDate };
  }

  private assignvalues(dates: DateValues) {
    const newFilter: DateFilterDto = {
      from: dates.sDate.toLocaleString(),
      to: dates.eDate.toLocaleString(),
      type: this.formControl.value,
    };
    this.store$.dispatch(UiActions.setPeriod({ newPeriod: newFilter }));
  }
}
