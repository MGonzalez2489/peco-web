import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectEntryCategoryComponent } from '@shared/components/form/select-entry-category/select-entry-category.component';
import { SelectEntryTypeComponent } from '@shared/components/form/select-entry-type/select-entry-type.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { EntrySearchDto } from '@core/models/dtos/search';
import { EntryCategory, EntryType } from '@core/models/entities';

@Component({
  selector: 'app-entries-filter-form',
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    FloatLabelModule,
    SelectEntryCategoryComponent,
    SelectEntryTypeComponent,
    ButtonModule,
    DatePickerModule,
  ],
  templateUrl: './entries-filter-form.component.html',
  styleUrl: './entries-filter-form.component.scss',
})
export class EntriesFilterFormComponent {
  @Output()
  search = new EventEmitter<EntrySearchDto>();

  form = new FormGroup({
    description: new FormControl(null),
    category: new FormControl<EntryCategory | null>(null),
    type: new FormControl<EntryType | null>(null),
    fromDate: new FormControl(null),
    toDate: new FormControl(null),
  });

  submit(): void {
    const search = new EntrySearchDto();
    if (this.form.value.description) {
      search.description = this.form.value.description;
    }
    if (this.form.value.category) {
      search.categoryId = this.form.value.category.publicId;
    }
    if (this.form.value.type) {
      search.entryTypeId = this.form.value.type.publicId;
    }
    if (this.form.value.fromDate) {
      search.fromDate = this.form.value.fromDate;
    }
    if (this.form.value.toDate) {
      search.toDate = this.form.value.toDate;
    }
    this.search.emit(search);
  }
  cancel(): void {}
}
