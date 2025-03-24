import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { PlannedEntriesTableComponent } from '@planned-entries/components/planned-entries-table/planned-entries-table.component';
import { PlannedEntryService } from '@planned-entries/planned-entry.service';
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
