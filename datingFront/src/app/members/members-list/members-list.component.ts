import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './members-list.component.html',
  styleUrl: './members-list.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersListComponent implements OnInit {
  private membersService = inject(MembersService);
  members = signal<Member[]>([]);

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.membersService.getMembers().subscribe(members => {
      this.members.set(members);
    });
  }

}
