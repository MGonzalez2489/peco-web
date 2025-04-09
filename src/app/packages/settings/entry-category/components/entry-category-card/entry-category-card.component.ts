import { TitleCasePipe } from '@angular/common';
import { Component, effect, inject, Input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EntryCategoryUpdateDto } from '@core/models/dtos';
import { EntryCategory } from '@core/models/entities';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  InvalidDirtyDirective,
  ValidationErrorDirective,
} from '@shared/directives/forms';
import { EntryCategoryActions } from '@store/actions/entry-category.actions';
import { AppState } from '@store/reducers';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CategoryAvatarComponent } from '@shared/components/data';

@Component({
  selector: 'app-entry-category-card',
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    IftaLabelModule,
    InputTextModule,
    InvalidDirtyDirective,
    ValidationErrorDirective,
    TitleCasePipe,
    FloatLabelModule,
    CategoryAvatarComponent,
  ],
  templateUrl: './entry-category-card.component.html',
  styleUrl: './entry-category-card.component.scss',
})
export class EntryCategoryCardComponent {
  private store$ = inject(Store<AppState>);
  private actions$ = inject(Actions);

  @Input({ required: true }) set category(value: EntryCategory) {
    this.categorySignal.set(value);
  }
  categorySignal = signal<EntryCategory | undefined>(undefined);

  mode = signal<'edit' | 'read'>('read');

  form = new FormGroup({
    name: new FormControl(),
    isVisible: new FormControl(),
  });

  constructor() {
    effect(() => {
      const category = this.categorySignal();
      if (category && this.mode() === 'edit') {
        this.form.patchValue({
          name: category.name,
          isVisible: category.isVisible,
        });
      }
    });
  }

  //read options
  readMode() {
    this.mode.set('read');
  }

  //edit options
  editMode() {
    this.mode.set('edit');
  }

  submit() {
    if (this.form.invalid || !this.categorySignal()) return;

    this.store$.dispatch(
      EntryCategoryActions.updateEntryCategory({
        categoryId: this.categorySignal()!.publicId!,
        category: this.form.value as EntryCategoryUpdateDto,
      }),
    );

    this.actions$
      .pipe(ofType(EntryCategoryActions.updateEntryCategorySuccess))
      .subscribe(() => {
        this.readMode();
      });
  }
  submitVisible() {
    if (!this.categorySignal()) return;
    this.form.patchValue({
      name: this.categorySignal()!.name,
      isVisible: !this.categorySignal()!.isVisible,
    });
    this.submit();
  }
}
