import { CurrencyPipe, DatePipe, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Entry } from '@core/models/entities';

@Component({
  selector: 'app-entry-list-item',
  imports: [DatePipe, NgStyle, CurrencyPipe],
  templateUrl: './entry-list-item.component.html',
  styleUrl: './entry-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryListItemComponent {
  @Input()
  entry!: Entry;
}
