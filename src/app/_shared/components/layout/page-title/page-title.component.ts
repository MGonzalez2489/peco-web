import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterState,
  TitleStrategy,
} from '@angular/router';
import { BaseComponent } from '@shared/components/_base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-page-title',
  imports: [],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss',
})
export class PageTitleComponent extends BaseComponent {
  private titleStrategy = inject(TitleStrategy);
  private router = inject(Router);

  title: string = '-- SIN TITULO --';
  constructor() {
    super();
    //listen title changes
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const newTitle = this.getTitle(
          this.router.routerState,
          this.router.routerState.root,
        );

        if (newTitle && newTitle !== '') {
          this.title = newTitle;
        }
      }
    });
  }
  getTitle(state: RouterState, parent: ActivatedRoute): string {
    let title = '';
    if (
      parent &&
      parent.snapshot &&
      this.titleStrategy.getResolvedTitleForRoute(parent.snapshot)
    ) {
      title = this.titleStrategy.getResolvedTitleForRoute(parent.snapshot);
    }
    if (state && parent && parent.firstChild) {
      title += this.getTitle(state, parent.firstChild);
    }
    return title;
  }
}
