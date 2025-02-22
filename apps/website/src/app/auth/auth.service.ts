import { inject, Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Session } from './session';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _session: Session | null = null;
  private _platform: Platform = inject(Platform);
  private readonly _sessionBehaviorSubject = new BehaviorSubject<Session | null>(null);

  public sessionChange(): Observable<Session | null> {
    return this._sessionBehaviorSubject.asObservable();
  }

  public get session(): Session | null {
    return this._session;
  }

  public get isLoggedIn(): boolean {
    return !!this._session;
  }

  public login(session: Session): void {
    this._session = session;
    this._sessionBehaviorSubject.next(session);
    localStorage.setItem('session', window.btoa(session.toJsonString()));
  }

  public init(): void {
    if (!this._platform.isBrowser) {
      return;
    }
    const session = localStorage.getItem('session');
    if (session) {
      this._session = new Session(JSON.parse(window.atob(session)));
      this._sessionBehaviorSubject.next(this._session);
    }
  }

  public logout(): void {
    this._session = null;
    this._sessionBehaviorSubject.next(null);
    localStorage.removeItem('session');
  }
}
