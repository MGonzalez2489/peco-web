import { Component, computed, effect, inject } from '@angular/core';

//primeng
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Toolbar } from 'primeng/toolbar';

import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';

import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AuthActions } from '@store/actions/auth.actions';
import { UiActions } from '@store/actions/ui.actions';
import { AppState } from '@store/reducers';
import {
  selectIsSideNavOpen,
  selectPageData,
  selectPlatformInfo,
  selectToken,
  selectUser,
} from '@store/selectors';
import { PrimeIcons } from 'primeng/api';

const components = [
  Toolbar,
  ButtonModule,
  InputTextModule,
  MenubarModule,
  AvatarModule,
  BadgeModule,
  MenuModule,
  MenubarModule,
];

@Component({
  selector: 'app-navbar',
  imports: [...components],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private store$ = inject(Store<AppState>);
  private sessionTimeout: ReturnType<typeof setTimeout> | undefined;
  user = toSignal(this.store$.select(selectUser));
  token = toSignal(this.store$.select(selectToken));
  pageData = toSignal(this.store$.select(selectPageData));
  platformData = toSignal(this.store$.select(selectPlatformInfo));

  isSideNavOpen = toSignal(this.store$.select(selectIsSideNavOpen), {
    initialValue: false,
  });
  toolBarItems = computed(() => this.generateToolBarItems());
  items = computed(() => this.generateMenuItems());

  constructor() {
    //token timer
    effect(() => {
      const tokenInfo = this.token();
      if (tokenInfo && !this.sessionTimeout) {
        let lifeTime = 0;

        //
        const expDate = new Date(tokenInfo.expiresAt);
        const nowDate = Date.now();
        lifeTime = expDate.getTime() - nowDate;
        //

        this.sessionTimeout = setTimeout(() => {
          alert('se acabo el session time');
          this.store$.dispatch(AuthActions.logout());
        }, lifeTime);
      }
    });
  }
  handleSideNavState() {
    this.store$.dispatch(
      UiActions.setSideBarState({ isOpen: !this.isSideNavOpen() }),
    );
  }
  private generateToolBarItems(): MenuItem[] {
    return [
      {
        label: 'Inicio',
        icon: PrimeIcons.HOME,
        routerLink: '/home',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Cuentas',
        icon: PrimeIcons.LIST_CHECK,
        routerLink: '/accounts',
      },
      {
        label: 'Registros',
        icon: PrimeIcons.LIST,
        routerLink: '/entries',
      },
    ];
  }
  private generateMenuItems(): MenuItem[] {
    return [
      {
        label: 'Acerca de',
        icon: PrimeIcons.INFO_CIRCLE,
        routerLink: '/app/about',
      },

      {
        separator: true,
      },
      {
        label: 'Cerrar Sesion',
        icon: PrimeIcons.SIGN_OUT,
        command: () => this.logOut(),
      },
    ];
  }
  private logOut() {
    this.store$.dispatch(AuthActions.logout());
  }
}
