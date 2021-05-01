import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wattage'
})
export class WattagePipe implements PipeTransform {

  transform(value: number): string {
    return `${value} W/h`;
  }

}
