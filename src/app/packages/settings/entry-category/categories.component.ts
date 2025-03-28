import { Component, effect, inject, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EntryCategory } from '@core/models/entities';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { selectEntryCategories } from '@store/selectors';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { TabsModule } from 'primeng/tabs';

import { toSignal } from '@angular/core/rxjs-interop';

import { DialogModule } from 'primeng/dialog';

import { NgClass } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MenuModule } from 'primeng/menu';
import { EntryCategoryCardComponent } from './components/entry-category-card/entry-category-card.component';

@Component({
  selector: 'app-categories',
  imports: [
    AccordionModule,
    PanelModule,
    CardModule,
    ButtonModule,
    DividerModule,
    ButtonGroupModule,
    FormsModule,
    TabsModule,
    // TitleCasePipe,
    EntryCategoryCardComponent,
    DialogModule,
    MenuModule,
    PanelModule,
    NgClass,
  ],
  providers: [DialogService],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  private store$ = inject(Store<AppState>);

  categories: Signal<EntryCategory[]> = toSignal(
    this.store$.select(selectEntryCategories),
    { initialValue: [] },
  );
  catMenuItems: MenuItem[] = [];
  selectedItem: EntryCategory | undefined;

  constructor() {
    effect(() => {
      const cats = this.categories();
      this.selectedItem = cats[0];
    });
  }
}
