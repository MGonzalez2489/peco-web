import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { selectSideNavState } from '@store/selectors';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-sidenav',
  imports: [
    ButtonModule,
    InputTextModule,
    MenuModule,
    RouterLink,
    AsyncPipe,
    NgClass,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
  toolBarItems: MenuItem[] | undefined;
  menuItems: MenuItem[] | undefined;
  store$ = inject(Store<AppState>);
  sideNavState$ = this.store$.select(selectSideNavState);

  ngOnInit() {
    this.generateMenuItems();
  }
  generateMenuItems() {
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
