import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AccordionModule } from 'primeng/accordion';

import { PrimeIcons } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-sidenav',
  imports: [AccordionModule, RouterLink, DividerModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  items: MenuItem[] = [
    {
      label: 'Navigate',
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
          icon: PrimeIcons.SHOP,
        },
        { separator: true },

        {
          label: 'Planear registros',
          route: '/planned-entries',
          routerLink: '/planned-entries',
          icon: PrimeIcons.LIST,
        },
        { separator: true },
        {
          label: 'Configuracion',
          icon: PrimeIcons.COG,
          items: [
            { label: 'Perfil', routerLink: '/settings', icon: PrimeIcons.USER },
            {
              label: 'Categorias',
              routerLink: '/settings/categories',
              icon: PrimeIcons.INFO,
            },
          ],
        },
      ],
    },
  ];
}
