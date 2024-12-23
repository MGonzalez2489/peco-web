import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  JsonPipe,
  LowerCasePipe,
  PercentPipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dynamicPipe',
  standalone: true,
})
export class DynamicPype implements PipeTransform {
  locale = 'en-US';
  private pipeMap: { [key: string]: PipeTransform } = {
    titlecase: new TitleCasePipe(),
    uppercase: new UpperCasePipe(),
    lowercase: new LowerCasePipe(),
    json: new JsonPipe(),
    decimal: new DecimalPipe(this.locale),
    percent: new PercentPipe(this.locale),
    date: new DatePipe(this.locale),
    currency: new CurrencyPipe(this.locale),
  };

  transform(value: any, pipeName?: string, ...args: any[]) {
    if (!value) return value;

    if (!pipeName) return value;

    if (pipeName.includes(':')) {
      const name = pipeName.split(':')[0];

      const param = pipeName.split(':')[1];
      if (name && param) {
        pipeName = name;
        if (!args) args = [];
        if (param) {
          args.push(param);
        }
      }
    }

    if (this.pipeMap[pipeName]) {
      return this.pipeMap[pipeName].transform(value, ...args);
    }
  }
}
