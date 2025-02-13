import { Directive, DoCheck, ElementRef, inject, Input } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Directive({
  selector: '[appInvalidDirty]',
  standalone: true,
})
export class InvalidDirtyDirective implements DoCheck {
  @Input('appInvalidDirty')
  directive: FormGroupDirective | undefined;

  private elementRef = inject(ElementRef);

  ngDoCheck() {
    const ctrl =
      this.directive?.form.controls[this.elementRef.nativeElement.id];

    if (ctrl?.invalid && this.directive?.submitted) {
      this.elementRef.nativeElement.classList.add('ng-invalid', 'ng-dirty');
      ctrl.markAsDirty();
    } else {
      this.elementRef.nativeElement.classList.remove('ng-invalid', 'ng-dirty');
    }
  }
}
