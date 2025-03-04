import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { PageTitleComponent } from '../page-title/page-title.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { ToastComponent } from '@shared/components/information';

@Component({
  selector: 'app-main-page',
  imports: [
    RouterOutlet,
    NavbarComponent,
    PageTitleComponent,
    SidenavComponent,
    ToastComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {}
