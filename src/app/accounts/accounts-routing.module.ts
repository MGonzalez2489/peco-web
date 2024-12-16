import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAccountComponent } from './pages/add-account/add-account.component';
import { ViewAccountComponent } from './pages/view-account/view-account.component';

const routes: Routes = [
  {
    path: 'add-account',
    component: AddAccountComponent,
  },
  {
    path: 'view-account',
    component: ViewAccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
