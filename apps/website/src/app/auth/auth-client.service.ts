import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiAuthResponse } from '@app/shared/api/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthClientService {

  constructor(private readonly _http: HttpClient) { }

  public login(username: string, password: string): Observable<ApiAuthResponse> {
    return this._http.post<ApiAuthResponse>('auth/login', { username, password })
  }
}
