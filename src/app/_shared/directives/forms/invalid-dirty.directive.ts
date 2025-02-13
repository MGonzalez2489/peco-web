import { Directive, DoCheck, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInvalidDirty]',
})
export class InvalidDirtyDirective implements DoCheck {
  constructor(
    private elementRef: ElementRef,
    private ngControl: NgControl,
  ) {}

  ngDoCheck() {
    if (this.ngControl.invalid) {
      this.elementRef.nativeElement.classList.add('ng-invalid', 'ng-dirty');
    } else {
      this.elementRef.nativeElement.classList.remove('ng-invalid', 'ng-dirty');
    }
  }
}
