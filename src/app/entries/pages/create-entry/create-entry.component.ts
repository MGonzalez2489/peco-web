import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EntryCreateDto } from '@core/models/dtos';
import { EntryService } from '@core/services';
import { Store } from '@ngrx/store';
import { BaseComponent } from '@shared/components';
import { EntryFormComponent } from '@shared/components/entries';
import { AccountActions } from '@store/actions/account.actions';
import { AppState } from '@store/reducers';
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
    EntryFormComponent,
  ],
  templateUrl: './create-entry.component.html',
  styleUrl: './create-entry.component.scss',
})
export class CreateEntryComponent extends BaseComponent {
  private activatedRoute = inject(ActivatedRoute);
  private store$ = inject(Store<AppState>);
  private entryService = inject(EntryService);
  private location = inject(Location);
  accountId: string | undefined;

  //
  fromAccountView = false;

  constructor() {
    super();
    const accId = this.activatedRoute.snapshot.params['accountId'];
    if (accId) {
      this.fromAccountView = true;
      this.accountId = accId;
    }
  }

  submit(newValue: EntryCreateDto | null): void {
    if (!newValue) this.cancel();

    if (!this.accountId && newValue?.accountId) {
      this.accountId = newValue.accountId;
      delete newValue.accountId;
    }

    this.entryService
      .create(this.accountId!, newValue!)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.store$.dispatch(
          AccountActions.getById({ accountId: this.accountId! }),
        );
        this.cancel();
      });
  }
  cancel(): void {
    this.location.back();
  }
}
