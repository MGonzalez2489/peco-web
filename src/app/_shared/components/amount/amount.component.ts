import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-amount',
  imports: [CurrencyPipe, TagModule],
  templateUrl: './amount.component.html',
  styleUrl: './amount.component.scss',
})
export class AmountComponent {
  @Input()
  amount = 0;
}
