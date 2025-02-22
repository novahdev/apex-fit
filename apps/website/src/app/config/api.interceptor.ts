import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const url = `api/${req.url}`;
  const router = inject(Router);
  const nzMessage = inject(NzMessageService);
  

  return next(req.clone({ url })).pipe(
    catchError(err => {
      if (err.status === 401) {
        router.navigate(['/']);
        nzMessage.error('Tú sesión ha expirado');
      }
      return throwError(() =>err);
    })
  );
};
