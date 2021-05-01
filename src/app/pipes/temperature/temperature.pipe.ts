import { Pipe, PipeTransform } from '@angular/core';

export type TemperatureUnit = 'kelvin' | 'celsius' | 'fahrenheit';

export const TemperatureSuffix = {
  kelvin: '°K',
  celsius: '°C',
  fahrenheit: '°F'
}

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(value: number, originalUnit: TemperatureUnit = 'celsius', displayUnit: TemperatureUnit = originalUnit): string {
    let displayValue = displayUnit !== originalUnit
      ? this.convert(value, originalUnit, displayUnit)
      : value;
    return `${Math.round(displayValue)} ${TemperatureSuffix[displayUnit]}`;
  }

  private convertToKelvin(value: number, unit: TemperatureUnit): number {
    switch (unit) {
      case 'celsius':
        return value + 273.15;
      case 'fahrenheit':
        return (value + 459.67) / (5/9);
      case 'kelvin':
        return value;
      default:
        return value;
    }
  }

  private convertFromKelvin(value: number, unit: TemperatureUnit): number {
    switch (unit) {
      case 'celsius':
        return value - 273.15;
      case 'fahrenheit':
        return value * (9/5) - 459.67;
      case 'kelvin':
        return value;
      default:
        return value;
    }
  }

  private convert(value: number, sourceUnit: TemperatureUnit, destUnit: TemperatureUnit): number {
    const valueInKelvin = this.convertToKelvin(value, sourceUnit);
    return this.convertFromKelvin(valueInKelvin, destUnit);
  }

}
