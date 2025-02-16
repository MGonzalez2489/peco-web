import {
  Directive,
  DoCheck,
  ElementRef,
  inject,
  Input,
  OnInit,
  Optional,
} from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  ValidationErrors,
} from '@angular/forms';
import { ErrorHandlerService } from '@core/services';

@Directive({
  selector: '[appValidationError]',
  standalone: true,
})
export class ValidationErrorDirective implements DoCheck, OnInit {
  private elementRef = inject(ElementRef);
  private errorHandlerService = inject(ErrorHandlerService);

  @Input('appValidationError')
  control: string | undefined;
  @Input()
  directive: FormGroupDirective | undefined;

  constructor(@Optional() private controlContainer: ControlContainer) {
    this.elementRef.nativeElement.classList.add('text-red-500');
  }
  ngOnInit(): void {
    this.updateErrorMessage(null);
  }

  get rootControl() {
    if (this.controlContainer && this.controlContainer.control) {
      return this.controlContainer.control.get(this.control!);
    }
    return null;
  }
  ngDoCheck() {
    if (this.directive && this.control !== '') {
      const ctrl = this.directive?.form.controls[this.control!];
      if (ctrl?.invalid && this.directive?.submitted) {
        this.updateErrorMessage(ctrl?.errors);
      }
    }
  }

  /**
   * Updates the displayed error message in the DOM.
   */
  private updateErrorMessage(errors: ValidationErrors | null) {
    this.elementRef.nativeElement.innerHTML = errors
      ? this.errorHandlerService.mapFormErrorMessages(errors)
      : null;
  }
}
