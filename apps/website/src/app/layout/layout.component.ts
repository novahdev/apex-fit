import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthService } from '../auth';
@Component({
  selector: 'app-layout',
  imports: [
    RouterLink,
    RouterOutlet,
    NzButtonModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  private readonly _authService: AuthService = inject(AuthService);
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
}
