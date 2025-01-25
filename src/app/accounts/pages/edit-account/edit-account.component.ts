import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '@core/models/entities';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BaseComponent } from '@shared/components';
import { AppState } from '@store/reducers';
import { selectAccountById } from '@store/selectors';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-account',
  imports: [
    CardModule,
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    FloatLabelModule,
    InputTextModule,
    MessageModule,
  ],
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.scss',
})
export class EditAccountComponent extends BaseComponent {
  private activatedRoute = inject(ActivatedRoute);
  private store$ = inject(Store<AppState>);
  // account$: Observable<Account | undefined>;

  actions$ = inject(Actions);
  router = inject(Router);
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    initialBalance: new FormControl({ value: 0, disabled: true }),
    isDefault: new FormControl(false),
  });

  constructor() {
    super();
    const accId = this.activatedRoute.snapshot.params['accountId'];
    this.store$
      .select(selectAccountById(accId))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.form.patchValue({ name: data!.name });
        this.form.patchValue({ initialBalance: data!.balance });
        this.form.patchValue({ isDefault: data!.isDefault });
      });
  }

  submit() {}
  cancel(): void {
    this.router.navigate(['/accounts']);
  }
}
