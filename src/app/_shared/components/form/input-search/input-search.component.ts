import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseComponent } from '@shared/components/_base.component';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

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
export class InputSearchComponent extends BaseComponent {
  @Output()
  hintChange = new EventEmitter<string | undefined>();
  @Input()
  placeholder = 'Buscar...';

  hint: string | undefined;
  //

  //milliseconds
  debounceTime = 500;
  handleSearch = new Subject<string>();
  constructor() {
    super();
    this.handleSearch
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
      )
      .subscribe((value) => {
        this.hint = value;
        this.emitValue();
      });
  }

  clearSearch(): void {
    this.hint = undefined;
    this.emitValue();
  }

  private emitValue() {
    if (this.hint && this.hint === '') {
      this.hint = undefined;
    }
    this.hintChange.emit(this.hint);
  }
}
