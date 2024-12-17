import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div>
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  </div>`,
  standalone: false,
})
export class AppComponent {}
