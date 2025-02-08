import { Component, inject, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { RouterLink } from '@angular/router';
import { UiService } from '@core/services';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  imports: [ButtonModule, InputTextModule, MenuModule, RouterLink, NgClass],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
  uiService = inject(UiService);
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
          },
        ],
      },
    ];
  }
}
