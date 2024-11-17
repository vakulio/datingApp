import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toasterService = inject(ToastrService);
  if (!accountService.currentUser()) {
    toasterService.error('You shall login first');
    return false;
  }
  return true;
};
