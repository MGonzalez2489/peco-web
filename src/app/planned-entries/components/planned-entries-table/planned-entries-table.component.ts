import { Component, Input } from '@angular/core';
import { ResultListDto } from '@core/models/dtos';
import { PlannedEntry } from '@core/models/entities';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-planned-entries-table',
  imports: [TableModule],
  templateUrl: './planned-entries-table.component.html',
  styleUrl: './planned-entries-table.component.scss',
})
export class PlannedEntriesTableComponent {
  @Input()
  entries!: ResultListDto<PlannedEntry>;
}
