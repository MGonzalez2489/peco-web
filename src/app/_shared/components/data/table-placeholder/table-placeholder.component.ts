/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table-placeholder',
  imports: [SkeletonModule, TableModule],
  templateUrl: './table-placeholder.component.html',
  styleUrl: './table-placeholder.component.scss',
})
export class TablePlaceholderComponent {
  @Input() isLoading = false;

  @Input() cols = 5;

  placeholderData: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}
