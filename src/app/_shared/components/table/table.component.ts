import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { TableDto } from '@core/models/dtos';
import { PaginationMetaModel } from '@core/models/responses';
import { DynamicPype } from './Dynamic.pipe';
import { MatSortModule, Sort } from '@angular/material/sort';

import {
  MAT_CHECKBOX_DEFAULT_OPTIONS,
  MatCheckboxDefaultOptions,
  MatCheckboxModule,
} from '@angular/material/checkbox';

const matControls = [
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
];

@Component({
  selector: 'app-table',
  imports: [CommonModule, DynamicPype, ...matControls],
  standalone: true,
  providers: [
    {
      provide: MAT_CHECKBOX_DEFAULT_OPTIONS,
      useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions,
    },
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T> implements OnInit {
  @Input()
  source: TableDto<T>;

  @Output()
  changeMeta: EventEmitter<PaginationMetaModel> = new EventEmitter();

  columnsDef: string[] = [];

  ngOnInit(): void {
    if (this.source) {
      this.columnsDef = this.source.columns.map((f) => f.def);
    }
  }

  handlePageEvent(e: PageEvent) {
    this.source.meta!.take = e.pageSize;
    this.source.meta!.page = e.pageIndex;
    this.changeMeta.emit(this.source.meta!);
  }
  sortData(e: Sort) {
    this.source.meta!.order = e.direction.toUpperCase();
    this.source.meta!.orderBy = e.active;
    this.changeMeta.emit(this.source.meta!);
  }
}
