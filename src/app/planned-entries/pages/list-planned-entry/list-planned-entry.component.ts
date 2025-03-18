import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { PlannedEntryService } from '@core/services';
import { PlannedEntriesTableComponent } from 'app/planned-entries/components/planned-entries-table/planned-entries-table.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-list-planned-entry',
  imports: [ButtonModule, PlannedEntriesTableComponent, RouterLink],
  templateUrl: './list-planned-entry.component.html',
  styleUrl: './list-planned-entry.component.scss',
})
export class ListPlannedEntryComponent {
  planedEntriesService = inject(PlannedEntryService);
  entries = toSignal(this.planedEntriesService.getAll());
}
