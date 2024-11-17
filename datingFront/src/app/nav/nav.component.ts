import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ILogin } from '../models/login';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  accountService = inject(AccountService);
  private router = inject(Router);
  private toasterService = inject(ToastrService);

  model: ILogin = {
    username: '',
    password: ''
  };

  login() {
    this.accountService.login(this.model).pipe(catchError((error: HttpErrorResponse) => {
      this.toasterService.error(error.error);
      return of(null);
    })).subscribe(() => {
      this.router.navigateByUrl('/members');
    },
    )
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
