import { Injectable, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class UiService {
  sidenavItems = signal<MenuItem[] | undefined>(undefined);
}
