import { Component, effect, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() placeholder = ' Buscar...';
  @Output() search = new EventEmitter<string | undefined>();

  private hintSubject = new Subject<string | undefined>();
  private debounceTimeValue = 500;
  protected inpId = 'searchInp';
  protected hint: string | undefined;
  constructor() {
    effect(() => {
      this.hintSubject
        .pipe(debounceTime(this.debounceTimeValue), distinctUntilChanged())
        .subscribe((value) => {
          this.search.emit(value);
        });
    });
  }
  //
  updateHint(value: string | undefined) {
    if (value === '') {
      value = undefined;
    }
    this.hint = value;
    this.hintSubject.next(this.hint);
  }
}
