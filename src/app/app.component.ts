import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { BaseComponent } from '@core/bases';
import { UiService } from '@core/services';
import { Store } from '@ngrx/store';
import { selectToken } from '@store/selectors';
import { AppState } from '@store/states';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
})
export class AppComponent extends BaseComponent implements OnInit {
  uiService = inject(UiService);
  store$ = inject(Store<AppState>);
  token$ = this.store$.select(selectToken);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  constructor() {
    super();
  }
  ngOnInit(): void {
    this.titleDetector();
  }

  titleDetector(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof ActivationEnd && event.snapshot.routeConfig?.title) {
        const conf = (event as ActivationEnd).snapshot.routeConfig;
        const title = conf?.title?.toString();
        this.uiService.currentPage.set(title ?? '');
      }
    });
  }
}
