import { Component, effect, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-input-search',
  imports: [
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss',
})
export class InputSearchComponent {
  private hintSubject = new Subject<string | undefined>();

  private placeholderSignal = signal<string>('Buscar...');
  protected inpId = 'searchInp';

  hintSignal = signal<string | undefined>(undefined);
  @Input()
  set placeholder(value: string) {
    this.placeholderSignal.set(value);
  }

  @Input()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onHintChange: (hint: string | undefined) => void = () => {};

  debounceTimeValue = 500;

  constructor() {
    effect(() => {
      this.hintSubject
        .pipe(debounceTime(this.debounceTimeValue), distinctUntilChanged())
        .subscribe((value) => {
          this.onHintChange(value);
        });
    });
  }

  updateHint(value: string | undefined) {
    if (value === '') {
      this.hintSignal.set(undefined);
    } else {
      this.hintSignal.set(value);
    }
    this.hintSubject.next(this.hintSignal());
  }

  clearSearch(): void {
    this.hintSignal.set(undefined);
    this.hintSubject.next(this.hintSignal());
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  get placeholder() {
    return this.placeholderSignal();
  }
}
