import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { AuthService } from '../auth';
import { UserDrawerMenuComponent } from './user-drawer-menu/user-drawer-menu.component';

@Component({
  selector: 'app-layout',
  imports: [
    RouterLink,
    RouterOutlet,
    NzButtonModule,
    NzDrawerModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _nzDrawerService: NzDrawerService = inject(NzDrawerService);
  protected readonly isLoggedIn = signal<boolean>(false);
  protected readonly name = signal<string>('');

  constructor(){
    this.isLoggedIn.set(this._authService.isLoggedIn);
    this.name.set(this._authService.session?.user.name ?? 'Guest');
    this._authService.sessionChange().subscribe((session) => {
      this.isLoggedIn.set(session !== null);
      if (session) {
        this.name.set(session.user.name);
      }
    });
  }

  protected openMenuUser(): void {
    this._nzDrawerService.create({
      nzTitle: this.name(),
      nzContent: UserDrawerMenuComponent
    });
  }
}
