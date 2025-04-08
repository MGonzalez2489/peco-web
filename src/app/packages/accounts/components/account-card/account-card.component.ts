import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '@core/models/entities';
import { AmountComponent } from '@shared/components/amount/amount.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AccountCardGraphComponent } from '../account-card-graph/account-card-graph.component';

@Component({
  selector: 'app-account-card',
  imports: [
    CardModule,
    TitleCasePipe,
    ToggleSwitchModule,
    FormsModule,
    AmountComponent,
    ButtonModule,
    AccountCardGraphComponent,
  ],
  templateUrl: './account-card.component.html',
  styleUrl: './account-card.component.scss',
})
export class AccountCardComponent {
  @Input()
  account: Account | undefined;

  @Input()
  showEdit = false;
}
