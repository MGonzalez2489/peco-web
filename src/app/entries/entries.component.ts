import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EntryService } from '@core/services';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-entries',
  imports: [CardModule, ButtonModule, RouterLink],
  templateUrl: './entries.component.html',
  styleUrl: './entries.component.scss',
})
export class EntriesComponent {
  entryService = inject(EntryService);
  constructor() {
    this.entryService.getAll().subscribe((data) => {
      console.log('entries', data);
    });
  }
}
