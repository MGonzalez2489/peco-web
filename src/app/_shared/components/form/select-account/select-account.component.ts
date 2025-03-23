/* eslint-disable @typescript-eslint/no-explicit-any */
import { TitleCasePipe } from '@angular/common';
import {
  Component,
  effect,
  forwardRef,
  inject,
  Input,
  signal,
} from '@angular/core';
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
import { Account } from '@core/models/entities';

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
  @Input() showAllOption = false;

  private store$ = inject(Store<AppState>);
  protected override inpId = 'account';
  accounts = signal<Account[]>([]);

  private accsSignal = toSignal(this.store$.select(selectAccounts));

  constructor() {
    super();
    effect(() => {
      const accs = this.accsSignal;
      let newArray: any[] = [];
      if (accs) {
        if (this.showAllOption) {
          newArray = [{ publicId: undefined, name: 'Todas' }, ...accs()!];
        } else {
          newArray = accs()!;
        }
        this.accounts.set(newArray);
      }
    });
  }

  select(event: SelectChangeEvent) {
    this.formControl.markAsDirty();
    this.formControl.markAsTouched();
    this.onChange(event.value);
  }
}
