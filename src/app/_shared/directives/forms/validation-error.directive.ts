/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { ErrorHandlerService } from '@core/services';

@Directive({
  selector: '[appValidationError]',
  standalone: true,
})
export class ValidationErrorDirective implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private errorHandlerService = inject(ErrorHandlerService);
  private errorColor = 'text-red-400';
  private control = signal<AbstractControl | null>(null);
  private formSubmitted = signal(false);

  @Input('appValidationError') controlName: string | undefined;
  @Input() directive: FormGroupDirective | undefined;

  @Input() value = signal<any>(null);
  private errorMessage = computed(() => {
    const ctrl = this.control();
    this.value();
    if (
      (ctrl?.invalid && ctrl?.dirty) ||
      (ctrl?.invalid && this.formSubmitted())
    ) {
      return this.errorHandlerService.mapFormErrorMessages(ctrl.errors!);
    }
    return null;
  });

  private effectRef = effect(() => {
    this.elementRef.nativeElement.textContent = this.errorMessage();
  });

  constructor() {
    this.elementRef.nativeElement.classList.add(
      this.errorColor,
      'ml-2',
      'mt-1',
    );
  }

  ngOnInit(): void {
    if (this.directive && this.controlName) {
      this.control.set(this.directive.form.get(this.controlName));

      this.control()?.valueChanges.subscribe((val) => {
        this.value.set(val);
      });

      this.directive.ngSubmit.subscribe(() => {
        this.formSubmitted.set(true);
      });
    }
  }
  ngOnDestroy(): void {
    this.effectRef.destroy();
  }
}
