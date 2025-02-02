import { Component, Input, OnInit } from '@angular/core';
import { Entry } from '@core/models/entities';
import { AmountComponent } from '@shared/components/amount/amount.component';
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
  ],
  templateUrl: './entry-table.component.html',
  styleUrl: './entry-table.component.scss',
})
export class EntryTableComponent implements OnInit {
  @Input()
  entries: Entry[] = [];

  @Input()
  showAccountColumn: boolean = false;

  ngOnInit(): void {}
}
