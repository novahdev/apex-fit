import { inject, Injectable } from '@angular/core';
import { CountriesClientService } from './countries-client.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private readonly _countriesClient = inject(CountriesClientService);

  public async getCountries(){
    return new Promise<{ code: string, name: string, phoneCode: string }[]>((resolve, reject) => {
      this._countriesClient.getCountries().subscribe({
        next: (data) => resolve(data.data),
        error: (error) => reject(error)
      });
    });
  }
}
