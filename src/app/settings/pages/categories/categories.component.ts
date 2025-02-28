import { TitleCasePipe } from '@angular/common';
import { Component, computed, inject, Signal } from '@angular/core';
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
import { EntryCategoryCardComponent } from 'app/settings/components/entry-category-card/entry-category-card.component';

@Component({
  selector: 'app-categories',
  imports: [
    AccordionModule,
    PanelModule,
    CardModule,
    ButtonModule,
    DividerModule,
    ButtonGroupModule,
    EntryCategoryCardComponent,
    FormsModule,
    TabsModule,
    TitleCasePipe,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  private store$ = inject(Store<AppState>);
  categories: Signal<EntryCategory[]> = toSignal(
    this.store$.select(selectEntryCategories),
    { initialValue: [] },
  );
  selected: Signal<EntryCategory> = computed(() => this.categories()[0]);
}
