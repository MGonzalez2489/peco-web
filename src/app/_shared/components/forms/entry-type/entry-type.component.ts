import { JsonPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  forwardRef,
  inject,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatButtonToggleChange,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { BaseComponent } from '@core/bases';
import { CatEntryType } from '@core/models/api/catalogs';
import { Store } from '@ngrx/store';
import { selectEntryTypes } from '@store/selectors';
import { AppState } from '@store/states';
import { takeUntil } from 'rxjs';

const matControls = [MatButtonModule, MatButtonToggleModule];

@Component({
  selector: 'app-entry-type',
  templateUrl: './entry-type.component.html',
  styleUrl: './entry-type.component.scss',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryTypeComponent),
      multi: true,
    },
  ],
  imports: [...matControls, FormsModule, ReactiveFormsModule],
})
export class EntryTypeComponent
  extends BaseComponent
  implements AfterViewInit, ControlValueAccessor
{
  private store$ = inject(Store<AppState>);
  entryTypes: CatEntryType[] = [];

  selected = new FormControl();

  ngAfterViewInit(): void {
    this.store$
      .select(selectEntryTypes)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.entryTypes = data;
        const firstValue = this.entryTypes[0];
        this.selected.setValue(firstValue);
        this.onChange(this.selected.value);
      });
  }

  //
  onChange = (value: CatEntryType) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    this.selected.setValue(obj);
  }
  setDisabledState?(isDisabled: boolean): void {}
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  selectValue(value: MatButtonToggleChange) {
    this.onChange(value.value);
  }
}
