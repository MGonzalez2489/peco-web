import { Component } from '@angular/core';

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
const components = [
  Toolbar,
  ButtonModule,
  InputTextModule,
  MenubarModule,
  AvatarModule,
  BadgeModule,
  MenuModule,
];

@Component({
  selector: 'app-navbar',
  imports: [...components],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Perfil',
        icon: PrimeIcons.USER,
      },
      {
        label: 'Blocks',
        icon: PrimeIcons.FILE_CHECK,
      },
      {
        separator: true,
      },
      {
        label: 'Cerrar Sesion',
        icon: PrimeIcons.SIGN_OUT,
      },
    ];
  }
}
