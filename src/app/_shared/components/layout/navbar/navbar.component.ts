import { Component, inject } from '@angular/core';

//primeng
import { MenuItem } from 'primeng/api';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';

import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';

import { PrimeIcons } from 'primeng/api';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { AuthActions } from '@store/actions/auth.actions';
import { Router } from '@angular/router';
import { selectIdentity } from '@store/selectors';
import { AsyncPipe } from '@angular/common';

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
export class NavbarComponent {
  private store$ = inject(Store<AppState>);
  private router = inject(Router);
  user$ = this.store$.select(selectIdentity);
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
}
