import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [Toolbar, ButtonModule, InputTextModule, MenuModule, RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
  toolBarItems: MenuItem[] | undefined;
  menuItems: MenuItem[] | undefined;

  ngOnInit() {
    this.toolBarItems = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
      },
    ];

    this.menuItems = [
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
            disabled: true,
          },
        ],
      },
    ];
  }
}
