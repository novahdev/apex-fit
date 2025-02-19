import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AthleteCategoryPipe } from '@app/website/common/athletes/athlete-category.pipe';
import { Athlete } from '@app/website/common/athletes/athlete.model';
import { AthletesService } from '@app/website/common/athletes/athletes.service';
import { CountryFlagsPipe } from '@app/website/common/flags/country-flags.pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-athletes-page',
  imports: [
    AthleteCategoryPipe,
    CountryFlagsPipe,
    NzInputModule,
    NzSelectModule,
    NzButtonModule
  ],
  templateUrl: './athletes-page.component.html',
  styleUrl: './athletes-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AthletesPageComponent {
  private readonly _nzMessageService = inject(NzMessageService);
  private readonly _athletesService = inject(AthletesService);

  public list = signal<Athlete[]>([]);

  constructor(){
    this._athletesService.getAthletes().then((athletes) => {
      this.list.set(athletes);
      console.log(athletes)
    })
    .catch(() => {
      this._nzMessageService.error('Error al cargar los atletas');
    });
  }
}
