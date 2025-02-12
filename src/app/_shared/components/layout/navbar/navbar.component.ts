import { Component, inject, OnInit } from '@angular/core';

//primeng
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Toolbar } from 'primeng/toolbar';

import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';

import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '@store/actions/auth.actions';
import { UiActions } from '@store/actions/ui.actions';
import { AppState } from '@store/reducers';
import { selectUser } from '@store/selectors';
import { PrimeIcons } from 'primeng/api';

const components = [
  Toolbar,
  ButtonModule,
  InputTextModule,
  MenubarModule,
  AvatarModule,
  BadgeModule,
  MenuModule,
  AsyncPipe,
];

@Component({
  selector: 'app-navbar',
  imports: [...components],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private store$ = inject(Store<AppState>);
  private router = inject(Router);
  user$ = this.store$.select(selectUser);
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.generateMenuItems();
  }
  generateMenuItems(): void {
    this.items = [
      {
        label: 'Perfil',
        icon: PrimeIcons.USER,
        disabled: true,
      },

      {
        separator: true,
      },
      {
        label: 'Cerrar Sesion',
        icon: PrimeIcons.SIGN_OUT,
        command: () => {
          this.logout();
        },
      },
    ];
  }
  logout(): void {
    this.store$.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }

  openSideNav() {
    this.store$.dispatch(UiActions.setSideBarState());
  }
}
