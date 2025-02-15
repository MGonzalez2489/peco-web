import { AsyncPipe, Location, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EntryCreateDto } from '@core/models/dtos';
import { EntryCategory, EntryType } from '@core/models/entities';
import { EntryService } from '@core/services';
import { Store } from '@ngrx/store';
import { BaseComponent } from '@shared/components';
import { SelectEntryCategoryComponent } from '@shared/components/form/select-entry-category/select-entry-category.component';
import { SelectEntryTypeComponent } from '@shared/components/form/select-entry-type/select-entry-type.component';
import { AccountActions } from '@store/actions/account.actions';
import { AppState } from '@store/reducers';
import { selectAccounts } from '@store/selectors';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-entry',
  imports: [
    CardModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputNumberModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    AsyncPipe,
    SelectEntryCategoryComponent,
    SelectEntryTypeComponent,
    NgClass,
  ],
  templateUrl: './create-entry.component.html',
  styleUrl: './create-entry.component.scss',
})
export class CreateEntryComponent extends BaseComponent {
  private store$ = inject(Store<AppState>);
  private activatedRoute = inject(ActivatedRoute);
  private entryService = inject(EntryService);
  private location = inject(Location);

  accounts$ = this.store$.select(selectAccounts);
  form = new FormGroup({
    description: new FormControl<string | null>(null, [Validators.required]),
    amount: new FormControl<number | null>(null, [Validators.required]),
    entryCategory: new FormControl<EntryCategory | null>(null, [
      Validators.required,
    ]),
    entryType: new FormControl<EntryType | null>(null),
    accountId: new FormControl<string | null>(null, [Validators.required]),
  });

  //
  fromAccountView = false;

  constructor() {
    super();
    const accId = this.activatedRoute.snapshot.params['accountId'];
    if (accId) {
      this.fromAccountView = true;
      this.form.patchValue({ accountId: accId });
    }
  }

  submit(): void {
    if (this.form.invalid) return;

    const value: EntryCreateDto = {
      amount: this.form.value.amount!,
      description: this.form.value.description!,
      categoryId: this.form.value.entryCategory!.publicId!,
      entryTypeId: this.form.value.entryType!.publicId!,
    };

    this.entryService
      .create(this.form.value.accountId!, value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.store$.dispatch(
          AccountActions.getById({ accountId: this.form.value.accountId! }),
        );
        this.cancel();
      });
  }
  cancel(): void {
    this.location.back();
  }
}
