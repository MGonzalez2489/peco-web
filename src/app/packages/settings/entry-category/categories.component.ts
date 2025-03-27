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

import { Actions, ofType } from '@ngrx/effects';
import { EntryCategoryActions } from '@store/actions/entry-category.actions';
import { DialogModule } from 'primeng/dialog';

import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuModule } from 'primeng/menu';
import { EntryCategoryFormComponent } from './components/entry-category-form/entry-category-form.component';
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
  ],
  providers: [DialogService],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  private store$ = inject(Store<AppState>);
  private actions$ = inject(Actions);
  private dialogService = inject(DialogService);

  categories: Signal<EntryCategory[]> = toSignal(
    this.store$.select(selectEntryCategories),
    { initialValue: [] },
  );
  //
  catMenuItems: MenuItem[] = [];
  selectedItem: EntryCategory | undefined;

  ref: DynamicDialogRef<EntryCategoryFormComponent> | undefined;

  constructor() {
    effect(() => {
      this.actions$
        .pipe(ofType(EntryCategoryActions.createEntryCategorySuccess))
        .subscribe(() => {
          this.closeDialog();
        });
    });
    effect(() => {
      const cats = this.categories();
      this.catMenuItems = cats.map((f) => {
        return { label: f.name, id: f.publicId };
      });
      this.selectMenuItem(this.catMenuItems[0]);
    });
  }
  selectMenuItem(item: MenuItem) {
    this.selectedItem = this.categories().find((f) => f.publicId === item.id);
    console.log('selected item', this.selectedItem);
  }

  addNewCategory(parent?: EntryCategory) {
    this.ref = this.dialogService.open(EntryCategoryFormComponent, {
      inputValues: { parent },
      header: 'Crear Categoria',
      width: '20vw',
      closeOnEscape: true,
      focusOnShow: true,
      modal: true,
    });

    const dialogRef = this.dialogService.dialogComponentRefMap.get(this.ref);

    dialogRef?.changeDetectorRef.detectChanges();
    const instance = dialogRef?.instance.componentRef
      ?.instance as EntryCategoryFormComponent;

    instance.save.subscribe((data) => {
      if (data) {
        this.store$.dispatch(
          EntryCategoryActions.createEntryCategory({ category: data }),
        );
      } else {
        this.closeDialog();
      }
    });
  }
  private closeDialog() {
    this.dialogService.getInstance(this.ref!).close();
    this.ref = undefined;
  }
}
