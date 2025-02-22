import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../auth';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const url = `api/${req.url}`;
  const router = inject(Router);
  const nzMessage = inject(NzMessageService);
  const auth = inject(AuthService);

  const session =  auth.session;
  let headers = req.headers;
  if (session) {
    headers = headers.set('Authorization', `Bearer ${session.token}`);
  }
  

  return next(req.clone({ url, headers })).pipe(
    catchError(err => {
      if (err.status === 401) {
        router.navigate(['/']);
        nzMessage.error('Tú sesión ha expirado');
      }
      return throwError(() =>err);
    })
  );
};
