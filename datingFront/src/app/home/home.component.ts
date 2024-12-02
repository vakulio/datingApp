import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  registerMode = signal<boolean>(false);

  registerToggle() {
    this.registerMode.update(val => !val);
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode.set(event);
  }

 

}
