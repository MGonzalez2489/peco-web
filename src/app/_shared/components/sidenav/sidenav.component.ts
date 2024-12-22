import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

interface linkItem {
  isActive: boolean;
  title: string;
  route: string;
}

@Component({
  selector: 'app-sidenav',
  imports: [MatListModule, MatIconModule, MatButtonModule, RouterModule],
  standalone: true,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  links: linkItem[] = [
    { title: 'home', isActive: false, route: '/home' },
    { title: 'accounts', isActive: false, route: '/accounts' },
  ];
}
