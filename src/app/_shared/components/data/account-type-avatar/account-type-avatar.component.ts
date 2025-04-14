import { NgStyle } from '@angular/common';
import { AfterViewInit, Component, Input, signal } from '@angular/core';
import { Account } from '@core/models/entities';
import { BaseComponent } from '@shared/components/base';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-account-type-avatar',
  imports: [AvatarModule, NgStyle],
  templateUrl: './account-type-avatar.component.html',
  styleUrl: './account-type-avatar.component.scss',
})
export class AccountTypeAvatarComponent
  extends BaseComponent
  implements AfterViewInit
{
  @Input()
  account!: Account;

  backgroundColor = signal('white');
  color = signal('white');
  size = signal<'large' | 'xlarge' | 'normal'>('large');

  ngAfterViewInit(): void {
    this.backgroundColor.set(this.account.color);
  }
}
