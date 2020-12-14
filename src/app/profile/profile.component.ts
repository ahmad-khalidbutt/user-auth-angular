import { Component, OnInit } from '@angular/core';
import { UserService } from '../users/user.service';
import { AuthService } from './../auth/auth.service';
import { User } from '../users/user.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup | any;
  errors: Array<string> = [];
  messages: Array<string> = [];
  constructor(public auth: AuthService, public user: UserService) {}
  currentUser: User;
  ngOnInit(): void {
    this.user.getCurrentUser().subscribe((user) => {
      if (user) {
        this.currentUser = user;
        this.profileForm = new FormGroup({
          firstName: new FormControl(
            this.currentUser.firstName,
            Validators.required
          ),
          lastName: new FormControl(
            this.currentUser.lastName,
            Validators.required
          ),
          username: new FormControl(this.currentUser.username, [
            Validators.required,
            Validators.minLength(5),
          ]),
          password: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
          ]),
        });
      }
    });
  }

  saveUser(): void {
    let { id } = this.currentUser;
    this.user.updateUser(id, this.profileForm.value).subscribe(() => {
      this.messages.push('Profile Updated 😃');
    });
  }
}
