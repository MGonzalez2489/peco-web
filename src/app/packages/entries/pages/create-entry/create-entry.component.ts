import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EntryFormComponent } from '@entries/components';
import { EntryCreateDto } from '@entries/dto/entry.dto';
import { EntryService } from '@entries/entry.service';
import { BasePageComponent } from '@shared/components/base';
import { AccountActions } from '@store/actions/account.actions';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { SelectModule } from 'primeng/select';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-entry',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputNumberModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    EntryFormComponent,
    PanelModule,
  ],
  templateUrl: './create-entry.component.html',
  styleUrl: './create-entry.component.scss',
})
export class CreateEntryComponent extends BasePageComponent {
  private entryService = inject(EntryService);
  accountIdSignal = signal('');
  constructor() {
    super();
    const accId = this.getParamFromRoute('accountId');
    if (accId) {
      this.accountIdSignal.set(accId);
    }
  }

  submit(newValue: EntryCreateDto | null): void {
    if (!newValue) {
      this.cancel();
      return;
    }

    this.entryService
      .create(newValue!)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.store$.dispatch(
          AccountActions.getById({ accountId: newValue!.accountId }),
        );
        this.cancel();
      });
  }
  cancel(): void {
    this.navigateBack();
  }
}
