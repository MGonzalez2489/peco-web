/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumReverse',
  pure: true,
})
export class EnumReversePipe implements PipeTransform {
  transform(enumType: any): { [value: string]: string } {
    return Object.freeze(
      Object.keys(enumType).reduce(
        (obj, key) => ({
          ...obj,
          [enumType[key as keyof typeof enumType]]: key,
        }),
        {},
      ),
    );
  }
}
