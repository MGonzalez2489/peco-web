import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-settings',
  imports: [RouterOutlet, MenuModule, PanelModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  items: MenuItem[] = [
    {
      label: 'Perfil',
      icon: PrimeIcons.USER,
      route: '/settings/profile',
      routerLink: '/settings/profile',
      command: (event) => {
        this.changeSelected(event.item as MenuItem);
      },
    },
    {
      label: 'Categorias',
      icon: PrimeIcons.RECEIPT,
      route: '/settings/categories',
      routerLink: '/settings/categories',
      command: (event) => {
        this.changeSelected(event.item as MenuItem);
      },
    },
  ];
  selected: MenuItem = this.items[0];
  router = inject(Router);
  constructor() {
    this.router.navigateByUrl(this.selected.routerLink);
  }
  changeSelected(item: MenuItem) {
    this.selected = item;
  }
}
