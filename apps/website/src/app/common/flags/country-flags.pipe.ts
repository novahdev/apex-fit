import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countryFlags',
})
export class CountryFlagsPipe implements PipeTransform {
  transform(value: string, arg?: string): unknown {
    if (arg === 'style'){
      return {
        background: `url(https://flagcdn.com/${value.toLowerCase()}.svg) no-repeat`,
        backgroundSize: 'contain'
      }
    }
    return `flag ${value.toLowerCase()}`;
  }
}
