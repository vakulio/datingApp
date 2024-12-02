 
import { AccountService } from './../../services/account.service';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule, DatePipe, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberEditComponent implements OnInit {
  member = signal<Member | null>(null);
  private membersService = inject(MembersService);
  private AccountService = inject(AccountService);
  private toastr = inject(ToastrService)
  editForm = viewChild<NgForm>('editForm')

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const username = this.AccountService.currentUser()?.username;
    if (!username) return;
    this.membersService.getMember(username).pipe().subscribe(member => {
      this.member.set(member);
    });
  }

  updateMember() {
    const form = this.editForm()
    if (form) {
      this.membersService.updateMember(form.value).pipe(take(1)).subscribe(() => {
        this.toastr.success('Member updated');
        this.editForm()?.reset(this.member())
      })
    }
   
  }
}

