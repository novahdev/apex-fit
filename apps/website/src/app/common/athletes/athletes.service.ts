import { inject, Injectable } from '@angular/core';
import { AthletesClientService } from './athletes-client.service';
import { Athlete } from './athlete.model';

@Injectable({
  providedIn: 'root'
})
export class AthletesService {
  private readonly _athletesClient = inject(AthletesClientService);

  public async getAthletes(): Promise<Athlete[]> {
    return new Promise((resolve, reject) => {
      this._athletesClient.getAllAthletes().subscribe({
        next: (response) => {
          resolve(response.data.map(x => new Athlete(x)));
        },
        error: (error) => {
          reject(error);
        }
      });
    })
  }
}
