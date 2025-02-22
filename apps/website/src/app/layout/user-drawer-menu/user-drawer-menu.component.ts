import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '@app/website/auth';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule, NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-user-drawer-menu',
  imports: [
    NzButtonModule,
    NzDrawerModule
  ],
  templateUrl: './user-drawer-menu.component.html',
  styleUrl: './user-drawer-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDrawerMenuComponent {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _nzDrawerRef: NzDrawerRef = inject(NzDrawerRef);

  protected onLogout(): void {
    this._authService.logout();
    this._nzDrawerRef.close();
  }
}
