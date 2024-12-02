import { HttpInterceptorFn } from '@angular/common/http';
import { AccountService } from '../services/account.service';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accService = inject(AccountService)
  if (accService.currentUser()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accService.currentUser()?.token}`
      }
    });
  }

  return next(req);
};
