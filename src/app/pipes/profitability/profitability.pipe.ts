import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profitability'
})
export class ProfitabilityPipe implements PipeTransform {

  transform(value: number, currency: string, interval: string = 'day'): string {
    return `${value} ${currency}/${interval}`;
  }

}
