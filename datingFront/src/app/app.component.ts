import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface User {
  id: number;
  userName: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'datingFront';
  users = signal<User[]>([]);

  httpClient = inject(HttpClient);

  ngOnInit() {
    this.httpClient.get('http://localhost:5000/api/users').subscribe(res => {
      if (Array.isArray(res)) {
        this.users.set(res);
      }
    });
  }
}
