import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ILogin } from '../models/login';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  cancelRegister = output<boolean>();
  model: ILogin = {
    username: '',
    password: ''
  };

  register() {
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => console.log(error)
    })
  }
  
  cancel() {
    this.cancelRegister.emit(false);
  }
}
