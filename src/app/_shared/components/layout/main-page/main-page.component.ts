import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EntryFilterDateComponent } from '@entries/components';
import { BasePage } from '@shared/components/base';
import { ToastComponent } from '@shared/components/information';
import { NavbarComponent } from '../navbar/navbar.component';
import { PageTitleComponent } from '../page-title/page-title.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { DateFilterDto } from '@entries/dto';
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
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent extends BasePage {
  selectPeriod(value: DateFilterDto) {
    this.store$.dispatch(UiActions.setPeriodSuccess({ newPeriod: value }));
  }
}
