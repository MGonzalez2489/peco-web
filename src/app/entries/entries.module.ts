import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { AddEntryComponent } from './pages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const matControls = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatButtonToggleModule,
];
@NgModule({
  declarations: [AddEntryComponent],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...matControls,
  ],
})
export class EntriesModule {}
