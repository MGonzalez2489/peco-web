import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';

import { PrimeIcons } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { SidenavItemComponent } from '../sidenav-item/sidenav-item.component';

@Component({
  selector: 'app-sidenav',
  imports: [AccordionModule, DividerModule, SidenavItemComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  items: MenuItem[] = [
    {
      title: 'Navigate',
      items: [
        {
          label: 'Inicio',
          route: '/home',
          routerLink: '/home',
          icon: PrimeIcons.HOME,
        },
        {
          label: 'Cuentas',
          route: '/accounts',
          routerLink: '/accounts',
          icon: PrimeIcons.FOLDER,
        },
        {
          label: 'Registros',
          route: '/entries',
          routerLink: '/entries',
          icon: PrimeIcons.RECEIPT,
        },
        { separator: true },
        {
          label: 'Planear registros',
          route: '/planned-entries',
          routerLink: '/planned-entries',
          icon: PrimeIcons.LIST,
          disabled: true,
        },
        { separator: true },
        {
          id: '1',
          label: 'Configuracion',
          icon: PrimeIcons.COG,
          items: [
            {
              label: 'Perfil',
              routerLink: '/settings/profile',
              icon: PrimeIcons.USER,
            },
            {
              label: 'Categorias',
              routerLink: '/settings/categories',
              icon: PrimeIcons.TAGS,
            },
          ],
        },
      ],
    },
  ];
}
