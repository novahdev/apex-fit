import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const url = `api/${req.url}`;
  

  return next(req.clone({ url })).pipe(
    catchError(err => {
      if (err.status === 401) {
        console.log("Error")
      }
      return throwError(() =>err);
    })
  );
};
