import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserslistComponent } from './userslist/userslist.component';
import { AdduserComponent } from './adduser/adduser.component';
import { authGuard } from '../../_helpers/auth.guard';

const routes: Routes = [
  {
    path: 'users', component: UserslistComponent,canActivate:[authGuard]
  },
  {
    path: 'adduser', component: AdduserComponent,canActivate:[authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
