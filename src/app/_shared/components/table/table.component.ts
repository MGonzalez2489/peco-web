import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { TableColumnDto, TableDto } from '@core/models/dtos';
import { PaginationMetaModel } from '@core/models/responses';
import { DynamicPype } from './Dynamic.pipe';
import { MatSortModule, Sort } from '@angular/material/sort';

import {
  MAT_CHECKBOX_DEFAULT_OPTIONS,
  MatCheckboxDefaultOptions,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { PecoPaginatorIntl } from './paginatorIntl';

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
    {
      provide: MatPaginatorIntl,
      useClass: PecoPaginatorIntl,
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

  @Output()
  view: EventEmitter<T> = new EventEmitter();

  columnsDef: string[] = [];

  ngOnInit(): void {
    this.readTableOptions();
    if (this.source) {
      this.columnsDef = this.source.columns.map((f) => f.def);
    }
    //
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
  viewRow(row: T) {
    this.view.emit(row);
  }

  private readTableOptions(): void {
    if (this.source.options.showViewButton) {
      this.source.columns.push(this.addViewColumnOption());
    }
  }

  private addViewColumnOption(): TableColumnDto {
    const newColumn: TableColumnDto = {
      def: '_view',
      header: '',
    };
    return newColumn;
  }
}
