import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ProfileClientService } from '@app/website/common/profile';
import { IProfile } from '@app/website/common/profile/profile.interface';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    NzButtonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private readonly _nzMessageService: NzMessageService = inject(NzMessageService);
  private readonly _profileClientService: ProfileClientService = inject(ProfileClientService);

  protected readonly data = signal<IProfile | null>(null);

  constructor() { 
    this._profileClientService.getInfo().subscribe({
      next: res => {
        this.data.set({
          alias: res.data.alias,
          name: res.data.name,
          lastName: res.data.lastName,
          email: res.data.email,
          username: res.data.username,
          isCoach: res.data.isCoach,
          address: res.data.address,
          birthdate: new Date(res.data.birthdate),
          cellphone: res.data.cellphone,
          city: res.data.city,
          country: res.data.country,
          nationality: res.data.nationality,
          sex: res.data.sex,
          state: res.data.state,
          tall: res.data.tall,
          weight: res.data.weight
        });
      },
      error: () => {
        this._nzMessageService.error('Error fetching profile information');
      }
    })
  }

}
