import { DecimalPipe, NgClass, NgStyle } from '@angular/common';
import { Component, inject, input, output, signal, OnInit } from '@angular/core';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';

import { Member } from 'src/app/models/member';
import { Photo } from 'src/app/models/photo';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [NgClass, FileUploadModule, DecimalPipe, NgStyle],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.scss',
})
export class PhotoEditorComponent implements OnInit {
  private accountService = inject(AccountService)
  private memberService = inject(MembersService)
  member = input.required<Member>()
  uploader?: FileUploader
  hasBaseDropZoneOver = signal(false)
  baseUrl = environment.apiUrl
  memberChange = output<Member>()

  ngOnInit(): void {
    this.initializeUploader()
  }

  fileOverBase(e: boolean) {
    this.hasBaseDropZoneOver.set(e)
  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo).subscribe(() => {
      const user = this.accountService.currentUser()
      if (user) {
        this.accountService.currentUser.update(user => {
          if (!user) return null
          return {...user, photoUrl: photo.url}
        })
        const updatedMember = { ...this.member(), photoUrl: photo.url }
        updatedMember.photos.forEach(p => {
          if (p.isMain) p.isMain = false
          if (p.id === photo.id) p.isMain = true
        })
        this.memberChange.emit(updatedMember)
      }
    })
  }

  deletePhoto(photo: Photo) {
    this.memberService.deletePhoto(photo).subscribe(() => {
      const user = this.accountService.currentUser()
      if (user) {
        const updatedMember = { ...this.member() }
        updatedMember.photos = updatedMember.photos.filter(p => p.id !== photo.id)
        this.memberChange.emit(updatedMember)
      }
    })
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.accountService.currentUser()?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024,
    })

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response) => {
      const photo = JSON.parse(response) as Photo
      const updatedMember = { ...this.member(), photos: [...this.member().photos, photo] }
      this.memberChange.emit(updatedMember)
      if (photo.isMain) {
        const user = this.accountService.currentUser()
        if (user) {
          this.accountService.currentUser.update(user => {
            if (!user) return null
            return {...user, photoUrl: photo.url}
          })}
          const updatedMember = { ...this.member(), photoUrl: photo.url }
        updatedMember.photos.forEach(p => {
          if (p.isMain) p.isMain = false
          if (p.id === photo.id) p.isMain = true
        })
        this.memberChange.emit(updatedMember)
      }
    }
  }
}
