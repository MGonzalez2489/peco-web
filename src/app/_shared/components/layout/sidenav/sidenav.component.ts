import { Component, effect, inject } from '@angular/core';
import { UiService } from '@core/services';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-sidenav',
  imports: [MenuModule, CardModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  uiService = inject(UiService);
  items: MenuItem[] | undefined = undefined;

  constructor() {
    effect(() => {
      this.items = this.uiService.sidenavItems();
    });
  }
}
