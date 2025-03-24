import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CountriesService } from '@app/website/common/countries/countries.service';
import { NzCellphoneComponent } from "../../ui/nz-cellphone/nz-cellphone.component";

@Component({
  selector: 'app-sign-up-page',
  imports: [
    RouterLink,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzSelectModule,
    NzDatePickerModule,
    NzCellphoneComponent
],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpPageComponent {
  private readonly _countries  = inject(CountriesService);
  public countries = signal<{ code: string, name: string, phoneCode: string }[]>([]);
  constructor(){
    this._countries.getCountries().then((countries) => {
      this.countries.set(countries);
    });
  }
}
