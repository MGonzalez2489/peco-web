import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EntryType } from '@core/models/entities';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { selectCatEntryTypes } from '@store/selectors';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

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
  ],
  templateUrl: './create-entry.component.html',
  styleUrl: './create-entry.component.scss',
})
export class CreateEntryComponent {
  store$ = inject(Store<AppState>);
  entryTypes$ = this.store$.select(selectCatEntryTypes);
  actions$ = inject(Actions);
  router = inject(Router);
  form = new FormGroup({
    description: new FormControl<string>('', [Validators.required]),
    amount: new FormControl<number>(0, [Validators.required]),
    entryType: new FormControl<EntryType | null>(null),
  });

  submit(): void {}
  cancel(): void {
    this.router.navigate(['/entries']);
  }
}
