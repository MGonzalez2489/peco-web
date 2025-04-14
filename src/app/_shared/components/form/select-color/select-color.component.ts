import { NgStyle } from '@angular/common';
import { AfterViewInit, Component, forwardRef } from '@angular/core';
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { BaseFormControl } from '../base-form-control';
import { $dt } from '@primeng/themes';

interface Color {
  name: string;
  value: string;
}

@Component({
  selector: 'app-select-color',
  imports: [SelectModule, ReactiveFormsModule, NgStyle],
  templateUrl: './select-color.component.html',
  styleUrl: './select-color.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectColorComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,

      useExisting: forwardRef(() => SelectColorComponent),
      multi: true,
    },
  ],
})
export class SelectColorComponent
  extends BaseFormControl
  implements AfterViewInit
{
  protected override inpId = 'colorInp';
  private light = '300';
  private normal = '400';
  private dark = '500';
  private themeColors: string[] = [
    'red',
    'orange',
    'yellow',
    'green',
    'cyan',
    'blue',
    'violet',
    'fuchsia',
    'pink',
    'gray',
  ];
  colors: Color[] = [];
  constructor() {
    super();
    this.generateColors();
  }
  ngAfterViewInit(): void {
    if (!this.formControl.value) {
      const randomElement =
        this.colors[Math.floor(Math.random() * this.colors.length)];

      this.formControl.setValue(randomElement);
      this.onChange(randomElement.value);
    } else if (typeof this.formControl.value === 'string') {
      const selectedColor = this.colors.find(
        (f) => f.value === this.formControl.value,
      );
      this.formControl.setValue(selectedColor);
      this.onChange(selectedColor!.value);
    }
  }

  select(event: SelectChangeEvent) {
    this.formControl.markAsDirty();
    this.formControl.markAsTouched();
    this.onChange(event.value.value);
  }
  private generateColors() {
    this.themeColors.forEach((tColor) => {
      //light
      this.colors.push({
        name: `tColor Light`.toUpperCase(),
        value: $dt(`${tColor}.${this.light}`).value,
      });
      //normal
      this.colors.push({
        name: `tColor`.toUpperCase(),
        value: $dt(`${tColor}.${this.normal}`).value,
      });
      //dark
      this.colors.push({
        name: `tColor Dark`.toUpperCase(),
        value: $dt(`${tColor}.${this.dark}`).value,
      });
    });
  }
}
