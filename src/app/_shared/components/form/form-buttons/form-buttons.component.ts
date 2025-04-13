import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ErrorMessageComponent } from '@shared/components/information';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-form-buttons',
  imports: [ButtonModule, ErrorMessageComponent],
  templateUrl: './form-buttons.component.html',
  styleUrl: './form-buttons.component.scss',
})
export class FormButtonsComponent {
  @Input()
  isBusy = false;

  @Output()
  accept = new EventEmitter<boolean>();

  protected save() {
    this.accept.emit(true);
  }
  protected cancel() {
    this.accept.emit(false);
  }
}
