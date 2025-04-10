import { NgSwitch, NgSwitchCase, NgTemplateOutlet } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeviceSizeEnum } from '@core/enums';
import { EntryFilterDateComponent } from '@entries/components';
import { BasePage } from '@shared/components/base';
import { ToastComponent } from '@shared/components/information';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { NavbarComponent } from '../navbar/navbar.component';
import { PageTitleComponent } from '../page-title/page-title.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectIsSideNavOpen } from '@store/selectors';
import { UiActions } from '@store/actions/ui.actions';

@Component({
  selector: 'app-main-page',
  imports: [
    RouterOutlet,
    NavbarComponent,
    PageTitleComponent,
    SidenavComponent,
    ToastComponent,
    EntryFilterDateComponent,
    NgSwitch,
    NgTemplateOutlet,
    NgSwitchCase,
    DrawerModule,
    ButtonModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent extends BasePage {
  deviceSizes = DeviceSizeEnum;
  view = signal<'large' | 'small'>('large');
  isSideNavOpen = toSignal(this.store$.select(selectIsSideNavOpen), {
    initialValue: false,
  });

  constructor() {
    super();

    effect(() => {
      const deviceInfo = this.platformInfo();
      if (
        deviceInfo.deviceSize === DeviceSizeEnum.large ||
        deviceInfo.deviceSize === DeviceSizeEnum.xLarge
      ) {
        this.view.set('large');
      } else {
        this.view.set('small');
      }
    });
  }

  handleSidenavNavigation() {
    this.store$.dispatch(
      UiActions.setSideBarState({ isOpen: !this.isSideNavOpen() }),
    );
  }
}
