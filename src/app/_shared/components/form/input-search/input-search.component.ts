import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { BaseComponent } from '@shared/components/_base.component';

@Component({
  selector: 'app-input-search',
  imports: [
    FormsModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
  ],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss',
})
export class InputSearchComponent extends BaseComponent {
  @Input()
  hint: string | undefined;
  @Output()
  hintChange = new EventEmitter<string | undefined>();

  //
  @Input()
  placeholder: string = 'Buscar...';

  //milliseconds
  debounceTime: number = 500;
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
        this.hint = value && value !== '' ? value : undefined;
        this.emitValue();
      });
  }

  clearSearch(): void {
    this.hint = undefined;
    this.emitValue();
  }

  private emitValue() {
    this.hintChange.emit(this.hint);
  }
}
