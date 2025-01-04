import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@core/bases';
import { Account, Entry } from '@core/models/api';
import { EntryDto } from '@core/models/dtos';
import { EntryService } from '@core/services';
import { Store } from '@ngrx/store';
import { GetAccountByIdAction } from '@store/actions/account.action';
import { selectCategories } from '@store/selectors';
import { AppState } from '@store/states';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-entry',
  standalone: false,

  templateUrl: './add-entry.component.html',
  styleUrl: './add-entry.component.scss',
})
export class AddEntryComponent extends BaseComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private entryService = inject(EntryService);
  private router = inject(Router);
  private store$ = inject(Store<AppState>);

  categories$ = this.store$.select(selectCategories);

  selectedType: string;

  form = new FormGroup({
    amount: new FormControl(0, [Validators.required]),
    description: new FormControl('', [Validators.required]),
    categoryId: new FormControl('-1', [Validators.required]),
  });

  account: Account;
  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.account = data['account'];
      });
  }

  submit() {
    if (this.form.invalid) return;

    this.entryService
      .create(this.account.publicId, this.form.value as EntryDto, 'income')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        if (data.data) {
          this.router.navigate(['/accounts/' + this.account.publicId]);
          this.store$.dispatch(
            GetAccountByIdAction({ accountId: this.account.publicId }),
          );
        }
      });
  }
  cancel() {
    this.router.navigate(['/accounts/' + this.account.publicId]);
  }
}
