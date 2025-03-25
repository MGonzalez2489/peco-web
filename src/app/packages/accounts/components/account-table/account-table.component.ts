import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ResultListDto } from '@core/models/dtos';
import { Account } from '@core/models/entities';
import { AmountComponent } from '@shared/components/amount/amount.component';
import { PaginatedComponent } from '@shared/components/base';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-account-table',
  imports: [
    TableModule,
    PaginatorModule,
    TagModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    DatePipe,
    RouterLink,
    ProgressSpinnerModule,
    TitleCasePipe,
    AmountComponent,
  ],
  templateUrl: './account-table.component.html',
  styleUrl: './account-table.component.scss',
})
export class AccountTableComponent extends PaginatedComponent {
  accountsSignal = signal<ResultListDto<Account> | undefined | null>(undefined);

  @Input()
  set accounts(value: ResultListDto<Account> | undefined | null) {
    this.accountsSignal.set(value);
  }
}
