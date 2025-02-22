import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProfileComponent } from "../../components/profile/profile.component";

@Component({
  selector: 'app-my-profile-page',
  imports: [ProfileComponent],
  templateUrl: './my-profile-page.component.html',
  styleUrl: './my-profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyProfilePageComponent {

}
