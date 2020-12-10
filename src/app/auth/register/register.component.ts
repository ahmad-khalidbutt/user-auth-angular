import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup | any;
  errors: Array<string> = [];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', [
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

  onSubmit() {
    console.log(this.registrationForm);
  }

  register(): void {
    this.auth.register(this.registrationForm.value).subscribe(
      () => {
        this.router.navigate(['/auth/login'], {
          queryParams: { registered: 'success' },
        });
      },
      (errorResponse) => {
        this.errors.push(errorResponse.error.message);
      }
    );
  }
}
