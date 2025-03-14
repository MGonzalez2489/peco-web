import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { PlannedEntryActions } from '@store/actions/planned-entry.actions';
import { AppState } from '@store/reducers';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CreatePlannedEntryFormComponent } from './components/create-entry-form/create-entry-form.component';

@Component({
  selector: 'app-planned-entries',
  imports: [ButtonModule, CardModule, CreatePlannedEntryFormComponent],
  templateUrl: './planned-entries.component.html',
  styleUrl: './planned-entries.component.scss',
})
export class PlannedEntriesComponent {
  private store$ = inject(Store<AppState>);

  load() {
    this.store$.dispatch(PlannedEntryActions.loadPlannedEntries());
  }
}
