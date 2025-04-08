import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Account } from '@core/models/entities';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-account-type-avatar',
  imports: [AvatarModule, NgStyle],
  templateUrl: './account-type-avatar.component.html',
  styleUrl: './account-type-avatar.component.scss',
})
export class AccountTypeAvatarComponent {
  @Input()
  account: Account | undefined = undefined;

  @Input()
  size: 'large' | 'xlarge' | 'normal' = 'normal';
}
