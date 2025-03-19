import { Component, Input } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  SelectEntryCategoryComponent,
  SelectEntryTypeComponent,
} from '@shared/components/form';
import {
  InvalidDirtyDirective,
  ValidationErrorDirective,
} from '@shared/directives/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-planned-entry-general-form',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    InvalidDirtyDirective,
    ValidationErrorDirective,
    SelectEntryTypeComponent,
    SelectEntryCategoryComponent,
    InputNumberModule,
  ],
  templateUrl: './planned-entry-general-form.component.html',
  styleUrl: './planned-entry-general-form.component.scss',
})
export class PlannedEntryGeneralFormComponent {
  @Input()
  form!: FormGroup;
  @Input()
  formDirective!: FormGroupDirective;
}
