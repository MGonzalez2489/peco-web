import { TitleCasePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EntryCategoryCreateDto } from '@core/models/dtos';
import { EntryCategory } from '@core/models/entities';
import {
  InvalidDirtyDirective,
  ValidationErrorDirective,
} from '@shared/directives/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-entry-category-form',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InvalidDirtyDirective,
    ValidationErrorDirective,
    FloatLabelModule,
    TitleCasePipe,
    ButtonModule,
  ],
  templateUrl: './entry-category-form.component.html',
  styleUrl: './entry-category-form.component.scss',
})
export class EntryCategoryFormComponent implements OnInit {
  ngOnInit(): void {
    console.log('on init');
  }
  @Output()
  save = new EventEmitter<EntryCategoryCreateDto | null>();

  @Input()
  set parent(value: EntryCategory | undefined) {
    if (value && value.publicId) {
      this.parentSignal.set(value);
      this.form.patchValue({ parentId: value.publicId });
    }
  }

  parentSignal = signal<EntryCategory | undefined>(undefined);

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    parentId: new FormControl<string | undefined>(undefined),
  });

  submit() {
    if (this.form.invalid) return;

    const value: EntryCategoryCreateDto = {
      name: this.form.value.name!,
    };
    if (this.form.value.parentId) {
      value.parentId = this.form.value.parentId!;
    } else {
      delete value.parentId;
    }

    this.save.emit(value);
  }
  cancel() {
    this.save.emit(null);
  }
}
