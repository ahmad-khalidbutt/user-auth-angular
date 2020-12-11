import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.interface';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent implements OnInit {
  users: Array<User> = [];
  messages: Array<string> = [];

  constructor(private user: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.user.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  deleteRow(user: User): void {
    this.user.deleteUser(user.id).subscribe(
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
