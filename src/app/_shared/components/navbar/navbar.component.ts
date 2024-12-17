import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

const material: any = [MatToolbarModule];
@Component({
  selector: 'app-navbar',
  imports: [...material],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {}
