import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [],
  templateUrl: './members-list.component.html',
  styleUrl: './members-list.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersListComponent {

}
