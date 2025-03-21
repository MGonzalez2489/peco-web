import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  Input,
} from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Directive({
  selector: '[appInvalidDirty]',
  standalone: true,
})
export class InvalidDirtyDirective {
  @Input('appInvalidDirty') directive: FormGroupDirective | undefined;

  private elementRef = inject(ElementRef);
  private control = computed(() => {
    return this.directive?.form.controls[this.elementRef.nativeElement.id];
  });

  private controlState = computed(() => {
    const ctrl = this.control();
    return {
      invalid: ctrl?.invalid,
      dirty: ctrl?.dirty,
    };
  });

  _effect = effect(() => {
    const state = this.controlState();
    if (this.directive?.submitted) {
      if (state.invalid) {
        this.elementRef.nativeElement.classList.add('ng-invalid');
      } else {
        this.elementRef.nativeElement.classList.remove('ng-invalid');
      }
      if (state.dirty) {
        this.elementRef.nativeElement.classList.add('ng-dirty');
      } else {
        this.elementRef.nativeElement.classList.remove('ng-dirty');
      }
    }
  });
}
