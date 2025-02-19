import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesClientService {

  constructor(private readonly _http: HttpClient) { }

  public getCountries(){
    return this._http.get<{ data: { code: string, name: string, phoneCode: string }[] }>('data/countries');
  }
}
