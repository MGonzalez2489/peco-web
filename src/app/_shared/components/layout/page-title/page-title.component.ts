import { Component, effect, inject, signal } from '@angular/core';
import {
  ActivatedRoute,
  ActivationEnd,
  NavigationEnd,
  Router,
  RouterState,
  TitleStrategy,
} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-page-title',
  imports: [],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss',
})
export class PageTitleComponent {
  private titleStrategy = inject(TitleStrategy);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  title = signal<string>('-- SIN TITULO --');

  constructor() {
    effect(() => {
      // Ejecutar la lógica inicial después de que el componente se inicializa
      if (this.activatedRoute.root.snapshot) {
        this.updateInitialTitle();
      }

      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this.updateTitle();
        });
    });

    effect(() => {
      this.router.events
        .pipe(
          filter(
            (event) =>
              event instanceof ActivationEnd &&
              event.snapshot === this.activatedRoute.root.snapshot,
          ),
        )
        .subscribe(() => {
          this.updateInitialTitle();
        });
    });
  }

  private updateInitialTitle(): void {
    const newTitle = this.getTitle(
      this.router.routerState,
      this.activatedRoute.root,
    );
    if (newTitle && newTitle !== '') {
      this.title.set(newTitle);
    }
  }

  private updateTitle(): void {
    const newTitle = this.getTitle(
      this.router.routerState,
      this.activatedRoute.root,
    );
    if (newTitle && newTitle !== '') {
      this.title.set(newTitle);
    }
  }

  getTitle(state: RouterState, parent: ActivatedRoute): string {
    let title = '';

    // Verificar primero si el padre tiene un título
    if (
      parent &&
      parent.snapshot &&
      this.titleStrategy.getResolvedTitleForRoute(parent.snapshot)
    ) {
      title = this.titleStrategy.getResolvedTitleForRoute(parent.snapshot);

      // Si el padre tiene título, construir el título desde el padre hacia abajo
      if (state && parent && parent.firstChild) {
        title += this.getTitle(state, parent.firstChild);
      }
    } else {
      // Si el padre no tiene título, buscar el título en los hijos
      if (state && parent && parent.firstChild) {
        title = this.getTitle(state, parent.firstChild);
      } else if (
        parent &&
        parent.snapshot &&
        this.titleStrategy.getResolvedTitleForRoute(parent.snapshot)
      ) {
        title = this.titleStrategy.getResolvedTitleForRoute(parent.snapshot);
      }
    }

    return title;
  }
}
