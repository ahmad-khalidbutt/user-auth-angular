import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { User } from './user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: Array<User> = [];
  messages: Array<string> = [];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.auth.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  deleteRow(user: User): void {
    this.auth.deleteUser(user.id).subscribe(
      (res) => {
        if (res) {
          this.messages.push(res.message);
          this.getUsers();
        }
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }
}
