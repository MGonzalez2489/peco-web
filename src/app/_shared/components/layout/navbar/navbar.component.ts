import { Component } from '@angular/core';

//primeng
import { MenuItem } from 'primeng/api';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButton } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

const components = [
  Toolbar,
  ButtonModule,
  SplitButton,
  InputTextModule,
  IconField,
  InputIcon,
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
        label: 'Update',
        icon: 'pi pi-refresh',
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
      },
    ];
  }
}
