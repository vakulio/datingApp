import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { Observable, of, tap } from 'rxjs';
import { Photo } from '../models/photo';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  readonly baseUrl = environment.apiUrl;
  members = signal<Member[]>([]);

  getMembers(): Observable<Member[]> {
    if (this.members().length > 0) {
      return of(this.members());
    }
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(tap(
      members => this.members.set(members)
    ));
  }

  getMember(username: string) {
    const member = this.members().find(m => m.userName === username)
    if (member) {
      return of(member);
    }
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      tap(() => this.members.update(members => members.map(m => m.userName === member.userName ? member : m)))
    );
  }

  setMainPhoto(photo: Photo) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photo.id, {}).pipe(
      tap(() => this.members.update(members => members.map(m => {
        if (m.photos.includes(photo)) {
          m.photoUrl = photo.url;
        }
        return m;
      }))));
  }

  deletePhoto(photo: Photo) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photo.id, {}).pipe(
      tap(() => this.members.update(members => members.map(m => {
        if (m.photos.includes(photo)) {
          m.photos = m.photos.filter(p => p.id !== photo.id);
        }
        return m;
      }))));
  }

}
