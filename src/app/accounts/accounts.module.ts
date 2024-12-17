import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AddAccountComponent } from './pages/add-account/add-account.component';
import { ViewAccountComponent } from './pages/view-account/view-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableComponent } from 'app/_shared/components/table/table.component';

const matControls = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatCardModule,
  MatPaginatorModule,
];

const shared = [TableComponent];

@NgModule({
  declarations: [AddAccountComponent, ViewAccountComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    matControls,
    ReactiveFormsModule,
    ...shared,
  ],
})
export class AccountsModule {}
