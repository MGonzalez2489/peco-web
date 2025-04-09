import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EntryCategory } from '@core/models/entities';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-category-avatar',
  imports: [AvatarModule, NgStyle],
  templateUrl: './category-avatar.component.html',
  styleUrl: './category-avatar.component.scss',
})
export class CategoryAvatarComponent {
  @Input()
  category: EntryCategory | undefined = undefined;

  @Input()
  size: 'large' | 'xlarge' | 'normal' = 'normal';
}
