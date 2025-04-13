import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { BasePageComponent } from '@shared/components/base';

@Component({
  selector: 'app-about',
  imports: [JsonPipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent extends BasePageComponent {}
