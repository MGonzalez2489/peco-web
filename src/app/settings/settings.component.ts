import { Component, inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiService } from '@core/services';

@Component({
  selector: 'app-settings',
  imports: [RouterOutlet],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnDestroy {
  uiService = inject(UiService);

  constructor() {
    this.uiService.sidenavItems.set([
      {
        label: 'Perfil',
        icon: 'pi pi-user',
        routerLink: '/settings/profile',
      },
      { separator: true },
      {
        label: 'Categorias',
        icon: 'pi pi-search',
        routerLink: '/settings/categories',
      },
    ]);
  }
  ngOnDestroy(): void {
    this.uiService.sidenavItems.set(undefined);
  }
}
