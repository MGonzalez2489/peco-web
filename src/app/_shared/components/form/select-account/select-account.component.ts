import { TitleCasePipe } from '@angular/common';
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
import { selectAccounts } from '@store/selectors';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { BaseFormControl } from '../base-form-control';

@Component({
  selector: 'app-select-account',
  imports: [
    SelectModule,
    FloatLabelModule,
    InvalidDirtyDirective,
    ReactiveFormsModule,
    TitleCasePipe,
  ],
  standalone: true,
  templateUrl: './select-account.component.html',

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectAccountComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,

      useExisting: forwardRef(() => SelectAccountComponent),
      multi: true,
    },
  ],
})
export class SelectAccountComponent extends BaseFormControl {
  private store$ = inject(Store<AppState>);
  protected override inpId = 'account';
  accounts = toSignal(this.store$.select(selectAccounts), { initialValue: [] });

  select(event: SelectChangeEvent) {
    this.formControl.markAsDirty();
    this.formControl.markAsTouched();
    this.onChange(event.value);
  }
}
