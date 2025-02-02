import { RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Member } from 'src/app/models/member';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberCardComponent {
  member = input.required<Member>()
}
