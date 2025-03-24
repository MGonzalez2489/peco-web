import { Location } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EntryCreateDto } from '@entries/dto/entry.dto';
import { EntryService } from '@entries/entry.service';
import { Store } from '@ngrx/store';
import { EntryFormComponent } from '@shared/components/entries';
import { AccountActions } from '@store/actions/account.actions';
import { AppState } from '@store/reducers';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { map } from 'rxjs';

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
export class CreateEntryComponent {
  private activatedRoute = inject(ActivatedRoute);
  private store$ = inject(Store<AppState>);
  private entryService = inject(EntryService);
  private location = inject(Location);
  accountIdSignal = toSignal(
    this.activatedRoute.paramMap.pipe(map((params) => params.get('accountId'))),
    { initialValue: null },
  );

  fromAccountView = signal<boolean>(false);
  private newValueSignal = signal<EntryCreateDto | null>(null);

  constructor() {
    effect(() => {
      const accId = this.accountIdSignal();
      if (accId) {
        this.fromAccountView.set(true);
      }
    });

    effect(() => {
      const newValue = this.newValueSignal();

      if (newValue) {
        this.entryService.create(newValue).subscribe(() => {
          this.store$.dispatch(
            AccountActions.getById({ accountId: newValue.accountId }),
          );
          this.cancel();
        });
      }
    });
  }

  submit(newValue: EntryCreateDto | null): void {
    if (!newValue) this.cancel();

    this.newValueSignal.set(newValue);
  }
  cancel(): void {
    this.location.back();
  }
}
