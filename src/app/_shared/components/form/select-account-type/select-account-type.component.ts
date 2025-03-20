import { Component, forwardRef, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { InvalidDirtyDirective } from '@shared/directives/forms';
import { AppState } from '@store/reducers';
import { selectCatAccountTypes } from '@store/selectors';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { BaseFormControl } from '../base-form-control';

@Component({
  selector: 'app-select-account-type',
  imports: [
    FloatLabelModule,
    SelectModule,
    ReactiveFormsModule,
    InvalidDirtyDirective,
  ],
  templateUrl: './select-account-type.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectAccountTypeComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,

      useExisting: forwardRef(() => SelectAccountTypeComponent),
      multi: true,
    },
  ],
})
export class SelectAccountTypeComponent extends BaseFormControl {
  private store$ = inject(Store<AppState>);
  protected override inpId = 'accountType';
  accountTypes = toSignal(this.store$.select(selectCatAccountTypes), {
    initialValue: [],
  });

  select(event: SelectChangeEvent) {
    this.formControl.markAsDirty();
    this.formControl.markAsTouched();
    this.onChange(event.value);
  }
}
