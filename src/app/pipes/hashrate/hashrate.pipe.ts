import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hashrate'
})
export class HashratePipe implements PipeTransform {

  transform(value: number, suffix: string, interval: string = 's'): string {
    return `${value} ${suffix}/${interval}`;
  }

}
