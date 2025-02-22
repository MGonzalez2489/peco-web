import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectEntryCategoryComponent } from '@shared/components/form/select-entry-category/select-entry-category.component';
import { SelectEntryTypeComponent } from '@shared/components/form/select-entry-type/select-entry-type.component';
import { CardModule } from 'primeng/card';
import { SplitterModule } from 'primeng/splitter';

const customComponents = [
  SelectEntryCategoryComponent,
  SelectEntryTypeComponent,
];

@Component({
  selector: 'app-home',
  imports: [
    CardModule,
    ReactiveFormsModule,
    SplitterModule,
    JsonPipe,
    ...customComponents,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  form = new FormGroup({
    category: new FormControl(null),
    entryType: new FormControl(null),
  });
}
