import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toasterService = inject(ToastrService);
  return next(req).pipe(
    catchError((err) => {
      if (err) {
        switch (err.status) {
          case 400:
            if (err.error.error) {
              const modalStateErrors = []
              for (const key in err.error.error) {
                if (err.error.error[key]) {
                  modalStateErrors.push(err.error.error[key]);
                }
              }
            } else {
              toasterService.error(err.error, err.status);
            }
            break;
          case 401:
            toasterService.error('Unauthorized', err.status);
            break;
          case 403:
            router.navigateByUrl('/not-found');
            break;
          case 500: {
              const navigationExtras: NavigationExtras = { state: { error: err.error } };
              router.navigateByUrl('/500', navigationExtras);
              break;
            }
          default:
            toasterService.error(err.error);
            break;
        }
      }
      throw err;
    })
  )
};
