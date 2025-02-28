import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-sidenav',
  imports: [MenuModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  items: MenuItem[] | undefined;
  constructor() {
    this.items = [
      {
        label: 'Configuracion',
        items: [
          {
            label: 'Perfil',
            icon: 'pi pi-user',
            routerLink: '/settings/profile',
          },
          { separator: true },
          {
            label: 'Categorias',
            icon: 'pi pi-search',
            routerLink: '/settings/categories',
          },
        ],
      },
    ];
  }
}
