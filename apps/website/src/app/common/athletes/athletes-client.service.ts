import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  ApiAthletesResponse } from '@app/shared/api/athletes/api-athletes';

@Injectable({
  providedIn: 'root'
})
export class AthletesClientService {

  constructor(private readonly _http: HttpClient) { }

  getAllAthletes(): Observable<ApiAthletesResponse> {
    return this._http.get<ApiAthletesResponse>('athletes');
  }
}
