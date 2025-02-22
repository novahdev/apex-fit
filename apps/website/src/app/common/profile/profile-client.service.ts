import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProfileResponse } from '@app/shared/api/profile'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileClientService {

  constructor(private readonly _http: HttpClient) { }

  getInfo(): Observable<ApiProfileResponse> {
    return this._http.get<ApiProfileResponse>('profile');
  }
}
