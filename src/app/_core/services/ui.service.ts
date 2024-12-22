import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  isSideBarOpened = signal(true);
  currentPage = signal('Home');
}
