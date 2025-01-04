import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { AddEntryComponent } from './pages';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

const matControls = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
];
@NgModule({
  declarations: [AddEntryComponent],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    ReactiveFormsModule,
    ...matControls,
  ],
})
export class EntriesModule {}
