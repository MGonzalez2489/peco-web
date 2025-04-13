import { NgStyle } from '@angular/common';
import { AfterViewInit, Component, Input, signal } from '@angular/core';
import { Account } from '@core/models/entities';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-account-type-avatar',
  imports: [AvatarModule, NgStyle],
  templateUrl: './account-type-avatar.component.html',
  styleUrl: './account-type-avatar.component.scss',
})
export class AccountTypeAvatarComponent implements AfterViewInit {
  @Input()
  account: Account | undefined = undefined;

  @Input()
  view: 'small' | 'large' = 'large';

  backgroundColor = signal('white');
  color = signal('black');
  size = signal<'large' | 'xlarge' | 'normal'>('normal');

  ngAfterViewInit(): void {
    if (this.view === 'small') {
      this.color.set(this.account!.color!);
      this.backgroundColor.set('--p-gray-300');
    } else {
      this.color.set('white');
      this.backgroundColor.set(this.account!.color!);
    }
  }
}
