import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthClientService, AuthService, Session } from '@app/website/auth';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-sign-in-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
  ],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInPageComponent {
  private readonly _nzMessage: NzMessageService = inject(NzMessageService);
  private readonly _authClienteService: AuthClientService = inject(AuthClientService);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  protected readonly formGroup = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  protected readonly loading = signal<boolean>(false);
  protected readonly invalid = signal<boolean>(true);

  constructor(){
    this.formGroup.statusChanges.subscribe(() => this.invalid.set(this.formGroup.invalid));
  }

  protected onSubmit(): void {
    if (this.formGroup.invalid){
      this._nzMessage.warning('Por favor, llena todos los campos');
      return;
    }

    const { username, password } = this.formGroup.getRawValue();
    this.loading.set(true);
    this.formGroup.disable();
    this._authClienteService.login(username, password).subscribe({
      next: response => {
        this._authService.login(new Session(response.data));
        this.loading.set(false);
        this.formGroup.enable();
        this._router.navigate(['/']);
      },
      error: () => {
        this._nzMessage.error('Usuario o contraseña inválidos');
        this.loading.set(false);
        this.formGroup.enable();
      }
    });
  }
}
