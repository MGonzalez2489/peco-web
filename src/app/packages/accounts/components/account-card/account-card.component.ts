import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Account } from '@core/models/entities';
import { AmountComponent } from '@shared/components/amount/amount.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AccountGraphComponent } from '../account-graph/account-graph.component';

@Component({
  selector: 'app-account-card',
  imports: [
    CardModule,
    TitleCasePipe,
    ToggleSwitchModule,
    FormsModule,
    AmountComponent,
    ButtonModule,
    RouterLink,
    AccountGraphComponent,
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
