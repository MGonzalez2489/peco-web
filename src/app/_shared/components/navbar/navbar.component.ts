import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { AppState } from '@store/states';
import { selectToken } from '@store/selectors';
import { CommonModule } from '@angular/common';
import { LogoutActions } from '@store/actions/auth.action';
import { UiService } from '@core/services';
import { Title } from '@angular/platform-browser';

const material: any = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
];
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, ...material],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  store$ = inject(Store<AppState>);
  token$ = this.store$.select(selectToken);
  uiService = inject(UiService);

  title = inject(Title);
  logout(): void {
    this.store$.dispatch(LogoutActions());
  }

  openSideNav() {
    this.uiService.isSideBarOpened.set(!this.uiService.isSideBarOpened());
  }
}
