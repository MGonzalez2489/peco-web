import { AsyncPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { selectUser } from '@store/selectors';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-profile',
  imports: [
    CardModule,
    AsyncPipe,
    ButtonModule,
    TitleCasePipe,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private store$ = inject(Store<AppState>);
  user$ = this.store$.select(selectUser);
}
