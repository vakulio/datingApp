import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ILogin } from '../_models/login';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  accountService = inject(AccountService);

  model: ILogin = {
    username: '',
    password: ''
  };

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.log(error)
    })
  }

  logout() {
    this.accountService.logout();
  }
}
