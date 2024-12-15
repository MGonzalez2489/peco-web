import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';

//mat
import { MatCardModule } from '@angular/material/card';
import { AccountListComponent } from './components/account-list/account-list.component';
import { MatButtonModule } from '@angular/material/button';

const matControls: any = [MatCardModule, MatButtonModule];

@NgModule({
  declarations: [HomeComponent, AccountListComponent],
  imports: [CommonModule, HomeRoutingModule, matControls],
})
export class HomeModule {}
