import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Entry } from '@core/models/entities';
import { EntryService } from '@core/services';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-entries',
  imports: [
    CardModule,
    ButtonModule,
    RouterLink,
    TableModule,
    CurrencyPipe,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  templateUrl: './entries.component.html',
  styleUrl: './entries.component.scss',
})
export class EntriesComponent {
  entryService = inject(EntryService);
  entries: Entry[] = [];
  constructor() {
    this.entryService.getAll().subscribe((data) => {
      this.entries = data.data;
      console.log('entries', data);
    });
  }
}
