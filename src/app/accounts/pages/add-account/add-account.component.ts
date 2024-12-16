import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '@core/bases';
import { AccountDto } from '@core/models/dtos';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  CreateAccounSuccesstAction,
  CreateAccountAction,
} from '@store/actions/account.action';
import { AppState } from '@store/states';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-account',
  standalone: false,
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.scss',
})
export class AddAccountComponent extends BaseComponent {
  store$ = inject(Store<AppState>);
  actions$ = inject(Actions);
  router = inject(Router);
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    initialBalance: new FormControl(0, [Validators.required]),
  });

  submit(): void {
    if (this.form.invalid) return;

    this.store$.dispatch(
      CreateAccountAction({ accountDto: this.form.value as AccountDto }),
    );
    //
    this.actions$
      .pipe(ofType(CreateAccounSuccesstAction), takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.router.navigate(['/home']);
      });
  }
}
