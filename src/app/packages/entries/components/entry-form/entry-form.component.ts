import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Account, EntryCategory, EntryType } from '@core/models/entities';
import { EntryCreateDto } from '@entries/dto/entry.dto';
import {
  FormButtonsComponent,
  SelectAccountComponent,
  SelectEntryCategoryComponent,
  SelectEntryTypeComponent,
} from '@shared/components/form';
import {
  InvalidDirtyDirective,
  ValidationErrorDirective,
} from '@shared/directives/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-entry-form',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputNumberModule,
    InputTextModule,
    SelectModule,
    ValidationErrorDirective,
    InvalidDirtyDirective,
    SelectEntryCategoryComponent,
    SelectEntryTypeComponent,
    ButtonModule,
    SelectAccountComponent,
    FormButtonsComponent,
  ],
  templateUrl: './entry-form.component.html',
  styleUrl: './entry-form.component.scss',
})
export class EntryFormComponent implements OnInit {
  @Output()
  save = new EventEmitter<EntryCreateDto | null>();

  @Input()
  accountId: string | undefined;

  @Input()
  isBusy = false;

  form = new FormGroup({
    description: new FormControl<string>('', [Validators.required]),
    amount: new FormControl<number>(0, [Validators.required]),
    category: new FormControl<EntryCategory | undefined>(undefined, [
      Validators.required,
    ]),
    entryType: new FormControl<EntryType | null>(null),
    account: new FormControl<Account | null>(null, [Validators.required]),
  });

  ngOnInit(): void {
    if (this.accountId) {
      this.form.controls.account.clearValidators();
      this.form.updateValueAndValidity();
    }
  }

  submit(): void {
    if (this.form.invalid) return;

    const value: EntryCreateDto = {
      amount: this.form.value.amount!,
      description: this.form.value.description!,
      categoryId: this.form.value.category!.publicId!,
      entryTypeId: this.form.value.entryType!.publicId!,
      accountId: this.accountId
        ? this.accountId
        : this.form.value.account!.publicId,
    };

    this.save.emit(value);
  }
  cancel(): void {
    this.save.emit(null);
  }
}
