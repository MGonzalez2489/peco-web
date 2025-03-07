import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-sidenav',
  imports: [MenuModule, CardModule, RouterLink],
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
        },
        {
          label: 'Cuentas',
          route: '/accounts',
        },
        {
          label: 'Registros',
          route: '/entries',
        },
      ],
    },
  ];
}
