import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAccountComponent } from './pages/add-account/add-account.component';
import { ViewAccountComponent } from './pages/view-account/view-account.component';
import { ListAccountsComponent } from './pages/list-accounts/list-accounts.component';

const routes: Routes = [
  {
    path: 'accounts',
    component: ListAccountsComponent,
    title: 'Accounts',
  },
  {
    path: 'add-account',
    component: AddAccountComponent,
    title: 'Add Account',
  },
  {
    path: ':accountId',
    component: ViewAccountComponent,
    title: 'View Account',
  },
  {
    path: '',
    redirectTo: 'accounts',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
