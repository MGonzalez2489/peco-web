import { AccountCardComponent } from '@accounts/components/account-card/account-card.component';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BasePageComponent } from '@shared/components/base';
import { ButtonDialComponent } from '@shared/components/layout-mobile/index.';
import { selectAccounts } from '@store/selectors';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { PanelModule } from 'primeng/panel';
@Component({
  selector: 'app-home',
  imports: [
    AccountCardComponent,
    ButtonModule,
    PanelModule,
    ButtonDialComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent extends BasePageComponent {
  accounts = toSignal(this.store$.select(selectAccounts));
  options: MenuItem[] = [
    {
      label: 'Nueva Cuenta',
      routerLink: '/accounts/new',
      icon: PrimeIcons.PLUS,
    },
    {
      label: 'Nuevo Registro',
      routerLink: '/entries/new',
      icon: PrimeIcons.PLUS,
    },
  ];
}
