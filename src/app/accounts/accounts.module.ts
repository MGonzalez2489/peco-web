import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AddAccountComponent } from './pages/add-account/add-account.component';
import { ViewAccountComponent } from './pages/view-account/view-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const matControls = [MatFormFieldModule, MatInputModule, MatButtonModule];

@NgModule({
  declarations: [AddAccountComponent, ViewAccountComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    matControls,
    ReactiveFormsModule,
  ],
})
export class AccountsModule {}
