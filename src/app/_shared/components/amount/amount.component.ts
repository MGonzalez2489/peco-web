import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-amount',
  imports: [CurrencyPipe, NgClass],
  templateUrl: './amount.component.html',
  styleUrl: './amount.component.scss',
})
export class AmountComponent {
  @Input()
  amount: number = 0;
}
