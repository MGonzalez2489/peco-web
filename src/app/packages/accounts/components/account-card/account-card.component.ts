import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '@core/models/entities';
import { AmountComponent } from '@shared/components/amount/amount.component';
import { AccountTypeAvatarComponent } from '@shared/components/data';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AccountCardGraphComponent } from '../account-card-graph/account-card-graph.component';

@Component({
  selector: 'app-account-card',
  imports: [
    PanelModule,
    TitleCasePipe,
    ToggleSwitchModule,
    FormsModule,
    AmountComponent,
    ButtonModule,
    AccountTypeAvatarComponent,
    AccountCardGraphComponent,
  ],
  templateUrl: './account-card.component.html',
  styleUrl: './account-card.component.scss',
})
export class AccountCardComponent {
  @Input()
  account: Account | undefined;
}
