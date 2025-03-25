import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ResultListDto } from '@core/models/dtos';
import { Entry } from '@core/models/entities';
import { AmountComponent } from '@shared/components/amount/amount.component';
import { PaginatedComponent } from '@shared/components/base';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-entry-table',
  imports: [
    TableModule,
    PaginatorModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    AmountComponent,
    DatePipe,
    TitleCasePipe,
  ],
  templateUrl: './entry-table.component.html',
  styleUrl: './entry-table.component.scss',
})
export class EntryTableComponent extends PaginatedComponent {
  @Input()
  entries: ResultListDto<Entry> | undefined;

  @Input()
  showAccountColumn = false;
}
