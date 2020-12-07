import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
