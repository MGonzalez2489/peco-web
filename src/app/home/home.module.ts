import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AccountListComponent } from './components/account-list/account-list.component';

//mat
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

const matControls: any = [
  MatCardModule,
  MatButtonModule,
  MatGridListModule,
  MatCardModule,
];

const shared: any = [];

@NgModule({
  declarations: [HomeComponent, AccountListComponent],
  imports: [CommonModule, HomeRoutingModule, matControls, ...shared],
})
export class HomeModule {}
