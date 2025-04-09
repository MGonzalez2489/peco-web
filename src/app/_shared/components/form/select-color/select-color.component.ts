import { NgStyle } from '@angular/common';
import { AfterViewInit, Component, forwardRef } from '@angular/core';
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { BaseFormControl } from '../base-form-control';

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
  colors: Color[] = [
    // Rojo
    { name: 'Rojo Suave Oscuro', value: '#B32649' },
    { name: 'Rojo Suave', value: '#E33E5F' },
    { name: 'Rojo Muy Claro', value: '#FF8A9E' },

    // Naranja
    { name: 'Naranja Suave Oscuro', value: '#CC7A00' },
    { name: 'Naranja Suave', value: '#FFB347' },
    { name: 'Naranja Muy Claro', value: '#FFD180' },

    // Amarillo
    { name: 'Amarillo Suave Oscuro', value: '#BFA300' },
    { name: 'Amarillo Suave', value: '#FFD740' },
    { name: 'Amarillo Muy Claro', value: '#FFF176' },

    // Verde
    { name: 'Verde Suave Oscuro', value: '#388E3C' },
    { name: 'Verde Suave', value: '#66BB6A' },
    { name: 'Verde Muy Claro', value: '#A5D6A7' },

    // Azul
    { name: 'Azul Suave Oscuro', value: '#1976D2' },
    { name: 'Azul Suave', value: '#42A5F5' },
    { name: 'Azul Muy Claro', value: '#90CAF9' },

    // Añil (Se acerca más a un púrpura suave)
    { name: 'Añil Suave Oscuro', value: '#512DA8' },
    { name: 'Añil Suave', value: '#7E57C2' },
    { name: 'Añil Muy Claro', value: '#B39DDB' },

    // Índigo (Similar al añil, con ligeras variaciones suaves)
    { name: 'Índigo Suave Oscuro', value: '#303F9F' },
    { name: 'Índigo Suave', value: '#5C6BC0' },
    { name: 'Índigo Muy Claro', value: '#9FA8DA' },

    // Violeta
    { name: 'Violeta Suave Oscuro', value: '#7B1FA2' },
    { name: 'Violeta Suave', value: '#9C27B0' },
    { name: 'Violeta Muy Claro', value: '#CE93D8' },

    // Gris Oscuro (en lugar de negro para UI)
    { name: 'Gris Muy Oscuro', value: '#424242' },
    { name: 'Gris Oscuro', value: '#757575' },
    { name: 'Gris Medio', value: '#BDBDBD' },
  ];

  constructor() {
    super();
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
}
