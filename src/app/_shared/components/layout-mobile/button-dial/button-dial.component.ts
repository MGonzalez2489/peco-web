import { Component, Input, signal, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SpeedDialModule } from 'primeng/speeddial';

@Component({
  selector: 'app-button-dial',
  imports: [SpeedDialModule, ButtonModule, RouterLink],
  templateUrl: './button-dial.component.html',
  styleUrl: './button-dial.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ButtonDialComponent {
  @Input()
  set items(value: MenuItem[] | undefined) {
    if (value) {
      this.sItems.set(value);
    }
  }

  sItems = signal<MenuItem[]>([]);
}
