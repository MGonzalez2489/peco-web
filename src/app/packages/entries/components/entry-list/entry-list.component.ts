import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';
import { ResultListDto } from '@core/models/dtos';
import { Account, Entry } from '@core/models/entities';
import { EntrySearchDto } from '@entries/dto';
import { PaginatedComponent } from '@shared/components/base';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { EntryListItemComponent } from '../entry-list-item/entry-list-item.component';

@Component({
  selector: 'app-entry-list',
  imports: [PanelModule, DividerModule, EntryListItemComponent],
  templateUrl: './entry-list.component.html',
  styleUrl: './entry-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryListComponent extends PaginatedComponent {
  @Input()
  entries: ResultListDto<Entry> | undefined;

  @Input()
  set account(value: Account | undefined) {
    if (value) {
      this.showAccountColumn = false;
    }
    this.selectedAccount.set(value);
  }

  protected selectedAccount = signal<Account | undefined>(undefined);

  override filters = new EntrySearchDto();
  showAccountColumn = true;
  constructor() {
    super();
  }

  onSearch(filters: EntrySearchDto) {
    const nAccount = this.selectedAccount();
    if (nAccount && this.filters) {
      this.filters.accountId = nAccount.publicId;
    }
    this.search.emit(filters);
  }
}
