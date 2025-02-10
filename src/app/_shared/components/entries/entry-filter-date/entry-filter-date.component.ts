import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { EntrySearchDto } from '@core/models/dtos/search';
import { SelectChangeEvent, SelectModule } from 'primeng/select';

interface EntryFilterByDate {
  key: string;
  label: string;
}

@Component({
  selector: 'app-entry-filter-date',
  imports: [SelectModule, ReactiveFormsModule],
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
export class EntryFilterDateComponent implements OnInit, ControlValueAccessor {
  //TODO: The start day of the week is sunday, implement an option to select that

  private defaultValue = 'month';
  filterOptions: EntryFilterByDate[] = [
    {
      key: 'today',
      label: 'Hoy',
    },
    {
      key: 'week',
      label: 'Esta Semana',
    },
    {
      key: 'month',
      label: 'Este mes',
    },
    {
      key: 'year',
      label: 'Este año',
    },
  ];
  selected = new FormControl<EntryFilterByDate | null>(null);

  @Input()
  search: EntrySearchDto | null = null;
  @Output()
  onChangeSearch = new EventEmitter<EntrySearchDto>();

  constructor() {
    const value = this.filterOptions[2];
    this.selected.setValue(value);
  }
  ngOnInit(): void {
    this.processSelection(this.defaultValue);
  }
  onSelect(event: SelectChangeEvent) {
    this.selected.setValue(event.value);

    this.processSelection(event.value.key);
  }

  processSelection(key: string) {
    // const option = this.filterOptions.find((f) => f.key === key)!;

    switch (key) {
      case 'today':
        this.generateTodayFilter();
        break;
      case 'week':
        this.generateWeekFilter();
        break;
      case 'month':
        this.generateMonthFilter();
        break;
      case 'year':
        this.generateYearFilter();
        break;
      default:
        break;
    }
    this.onChangeSearch.emit(this.search!);
  }
  private generateTodayFilter() {
    let sDate: Date = new Date();
    sDate.setHours(0, 0, 0);

    let eDate: Date = new Date();
    eDate.setHours(23, 59, 59);
    this.assignvalues(sDate, eDate);
  }
  private generateWeekFilter() {
    const today = new Date();
    const sDate = new Date(today.setDate(today.getDate() - today.getDay()));
    sDate.setHours(0, 0, 0);

    const eDate = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    eDate.setHours(23, 59, 59);
    this.assignvalues(sDate, eDate);
  }
  private generateMonthFilter() {
    const today = new Date();
    const sDate = new Date(today.getFullYear(), today.getMonth(), 1);
    sDate.setHours(0, 0, 0);

    const eDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    eDate.setHours(23, 59, 59);
    this.assignvalues(sDate, eDate);
  }
  private generateYearFilter() {
    const today = new Date();
    const sDate = new Date(today.getFullYear(), 0, 1);

    sDate.setHours(0, 0, 0);

    const eDate = new Date(today.getFullYear(), 11, 31);
    eDate.setHours(23, 59, 59);

    this.assignvalues(sDate, eDate);
  }

  private assignvalues(sDate: Date, eDate: Date) {
    if (this.search) {
      this.search.fromDate = sDate.toLocaleString();
      this.search.toDate = eDate.toLocaleString();
    }
  }

  //
  //value accessor
  onChange = (value: EntryFilterByDate) => {
    this.selected.setValue(value);
  };
  onTouched = () => {};

  writeValue(obj: any): void {
    if (obj) this.selected.setValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
