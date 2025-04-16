import { Component, effect, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from '@shared/components/base';
import { ErrorMessageComponent } from '@shared/components/information';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-form-buttons',
  imports: [ButtonModule, ErrorMessageComponent],
  templateUrl: './form-buttons.component.html',
  styleUrl: './form-buttons.component.scss',
})
export class FormButtonsComponent extends BaseComponent {
  @Output()
  accept = new EventEmitter<boolean>();

  busy = false;

  constructor() {
    super();
    effect(() => {
      const newValue = this.isBusy();
      console.log('newValue', newValue);
      this.busy = newValue;
    });
  }

  protected save() {
    this.accept.emit(true);
  }
  protected cancel() {
    this.accept.emit(false);
  }
}
