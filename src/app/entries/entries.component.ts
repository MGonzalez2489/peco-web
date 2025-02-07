import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ResultListDto } from '@core/models/dtos';
import { EntrySearchDto } from '@core/models/dtos/search';
import { Entry } from '@core/models/entities';
import { EntryService } from '@core/services';
import { EntryTableComponent } from '@shared/components/entries';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-entries',
  imports: [
    CardModule,
    ButtonModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    EntryTableComponent,
    AsyncPipe,
  ],
  templateUrl: './entries.component.html',
  styleUrl: './entries.component.scss',
})
export class EntriesComponent {
  entryService = inject(EntryService);
  entries$ = new Observable<ResultListDto<Entry>>();

  search(search?: EntrySearchDto): void {
    this.entries$ = this.entryService.search(search);
  }
}
