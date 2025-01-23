import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { PageTitleComponent } from '../page-title/page-title.component';

@Component({
  selector: 'app-main-page',
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidenavComponent,
    PageTitleComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {}
