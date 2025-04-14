import { NgTemplateOutlet } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { DeviceSizeEnum } from '@core/enums';
import { BasePageComponent } from '@shared/components/base';
import { ToastComponent } from '@shared/components/information';
import { UiActions } from '@store/actions/ui.actions';
import { selectIsSideNavOpen } from '@store/selectors';
import { ButtonModule } from 'primeng/button';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { NavbarComponent } from '../navbar/navbar.component';
import { PageTitleComponent } from '../page-title/page-title.component';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-main-page',
  imports: [
    RouterOutlet,
    NavbarComponent,
    PageTitleComponent,
    SidenavComponent,
    ToastComponent,
    // EntryFilterDateComponent,
    NgTemplateOutlet,
    DrawerModule,
    ButtonModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent extends BasePageComponent {
  @ViewChild('drawerRef') drawerRef!: Drawer;
  deviceSizes = DeviceSizeEnum;

  isSideNavOpen = toSignal(this.store$.select(selectIsSideNavOpen), {
    initialValue: false,
  });

  constructor() {
    super();
  }

  handleSidenavNavigation() {
    this.store$.dispatch(
      UiActions.setSideBarState({ isOpen: !this.isSideNavOpen() }),
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }
  onHideDraw() {
    this.store$.dispatch(UiActions.setSideBarState({ isOpen: false }));
  }
}
