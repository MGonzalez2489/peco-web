import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEntryComponent } from './pages';
import { AccountService } from '@core/services';

const routes: Routes = [
  {
    path: 'add',
    component: AddEntryComponent,
    resolve: { account: AccountService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntriesRoutingModule {}
