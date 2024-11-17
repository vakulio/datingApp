import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent {

}
