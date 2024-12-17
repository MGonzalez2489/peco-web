import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Entry } from '@core/models/api';
import { TableDto } from '@core/models/dtos';
import { PaginationMetaModel } from '@core/models/responses';
import { DynamicPype } from './Dynamic.pipe';

const matControls = [MatButtonModule, MatTableModule, MatPaginatorModule];

@Component({
  selector: 'app-table',
  imports: [CommonModule, DynamicPype, ...matControls],
  standalone: true,
  providers: [DynamicPype],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @Input()
  source: TableDto<Entry>;

  @Output()
  changeMeta: EventEmitter<PaginationMetaModel> = new EventEmitter();

  columnsDef: string[] = [];

  constructor() {
    console.log('this entry', this.source);
  }
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
}
