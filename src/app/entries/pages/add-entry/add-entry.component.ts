import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@core/bases';
import { Account, Category, Entry } from '@core/models/api';
import { CatEntryType } from '@core/models/api/catalogs';
import { EntryDto } from '@core/models/dtos';
import { EntryService } from '@core/services';
import { Store } from '@ngrx/store';
import { GetAccountByIdAction } from '@store/actions/account.action';
import { selectCategories, selectEntryTypes } from '@store/selectors';
import { AppState } from '@store/states';
import { Observable, takeUntil } from 'rxjs';

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
  entryTypes: CatEntryType[] = [];

  selectedType: CatEntryType;

  form = new FormGroup({
    amount: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
    ]),
    description: new FormControl<string>('', [Validators.required]),
    category: new FormControl<Category | null>(null, [Validators.required]),
  });

  account: Account;
  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.account = data['account'];
      });

    this.store$
      .select(selectEntryTypes)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.entryTypes = data;
        this.selectedType = this.entryTypes[0];
      });
  }

  submit() {
    if (this.form.invalid) return;

    const newEntry: EntryDto = {
      amount: this.form.value.amount!,
      description: this.form.value.description!,
      categoryId: this.form.value.category!.publicId,
    };

    this.entryService
      .create(this.account.publicId, newEntry, this.selectedType)
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
