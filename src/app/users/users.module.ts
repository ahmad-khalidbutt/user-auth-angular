import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    children: [
      { path: 'list', component: UserlistComponent, canActivate: [AuthGuard] },
    ],
  },
];

@NgModule({
  declarations: [UserlistComponent],
  exports: [UserlistComponent, RouterModule],
  imports: [RouterModule.forChild(routes), CommonModule],
  providers: [UserService],
})
export class UsersModule {}
