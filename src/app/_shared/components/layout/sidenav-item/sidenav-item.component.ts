import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-sidenav-item',
  imports: [
    NgTemplateOutlet,
    RouterLink,
    RippleModule,
    DividerModule,
    AccordionModule,
    RouterLinkActive,
  ],
  templateUrl: './sidenav-item.component.html',
  styleUrl: './sidenav-item.component.scss',
})
export class SidenavItemComponent {
  menuItem = signal<MenuItem | undefined>(undefined);
  type = signal<'title' | 'link' | 'accordion' | 'separator'>('title');

  activeIndex = 0;

  @Input() set item(value: MenuItem | undefined) {
    this.menuItem.set(value);
    if (value) {
      this.detectItemType(value);
    }
  }

  private detectItemType(value: MenuItem) {
    if (value.separator) {
      this.type.set('separator');
      return;
    }
    if (value.title) {
      this.type.set('title');
      return;
    }

    if (value.routerLink && !value.items) {
      this.type.set('link');
      return;
    }

    this.type.set('accordion');
  }
  activeIndexChange(index: number) {
    this.activeIndex = index;
  }
  exCommand(item: MenuItem) {
    if (item.command) {
      const event: MenuItemCommandEvent = {};
      item.command(event);
    }
  }
}
