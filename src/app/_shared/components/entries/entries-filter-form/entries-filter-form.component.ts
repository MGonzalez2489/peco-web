import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectEntryCategoryComponent } from '@shared/components/form/select-entry-category/select-entry-category.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-entries-filter-form',
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    FloatLabelModule,
    SelectEntryCategoryComponent,
  ],
  templateUrl: './entries-filter-form.component.html',
  styleUrl: './entries-filter-form.component.scss',
})
export class EntriesFilterFormComponent {
  form = new FormGroup({
    description: new FormControl(null),
    category: new FormControl(null),
    type: new FormControl(null),
    createdAt: new FormControl(null),
  });

  submit(): void {}
  cancel(): void {}
}
