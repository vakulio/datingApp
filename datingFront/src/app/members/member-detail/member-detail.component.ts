import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberDetailComponent {

}
