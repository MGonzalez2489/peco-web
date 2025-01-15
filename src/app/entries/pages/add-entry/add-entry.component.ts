import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@core/bases';
import { Account, EntryCategory } from '@core/models/api';
import { CatEntryType } from '@core/models/api/catalogs';
import { EntryDto } from '@core/models/dtos';
import { EntryService } from '@core/services';
import { Store } from '@ngrx/store';
import { GetAccountByIdAction } from '@store/actions/account.action';
import { selectCategories } from '@store/selectors';
import { AppState } from '@store/states';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrl: './add-entry.component.scss',
  standalone: false,
})
export class AddEntryComponent extends BaseComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private entryService = inject(EntryService);
  private router = inject(Router);
  private store$ = inject(Store<AppState>);

  categories$ = this.store$.select(selectCategories);

  form = new FormGroup({
    amount: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
    ]),
    description: new FormControl<string>('', [Validators.required]),
    category: new FormControl<EntryCategory | null>(null, [
      Validators.required,
    ]),
    entryType: new FormControl<CatEntryType | null>(null),
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

    const newEntry: EntryDto = {
      amount: this.form.value.amount!,
      description: this.form.value.description!,
      categoryId: this.form.value.category!.publicId,
      entryTypeId: this.form.value.entryType!.publicId,
    };

    this.entryService
      .create(this.account.publicId, newEntry)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        if (data.data) {
          this.store$.dispatch(
            GetAccountByIdAction({ accountId: this.account.publicId }),
          );

          this.router.navigate(['/accounts/' + this.account.publicId]);
        }
      });
  }
  cancel() {
    this.router.navigate(['/accounts/' + this.account.publicId]);
  }
}
