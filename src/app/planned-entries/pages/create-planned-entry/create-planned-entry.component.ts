import { Component } from '@angular/core';
import { CreatePlannedEntryFormComponent } from 'app/planned-entries/components/create-entry-form/create-entry-form.component';

@Component({
  selector: 'app-create-planned-entry',
  imports: [CreatePlannedEntryFormComponent],
  templateUrl: './create-planned-entry.component.html',
  styleUrl: './create-planned-entry.component.scss',
})
export class CreatePlannedEntryComponent {}
