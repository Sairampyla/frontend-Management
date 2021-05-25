import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { LoginComponent } from './Components/login/login.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { UserCreateComponent } from './Components/user-create/user-create.component';
import { UserEditComponent } from './Components/user-edit/user-edit.component';
import { UserListComponent } from './Components/user-list/user-list.component';


const routes: Routes = [
  {
    path:'',redirectTo:'/login',pathMatch:'full'
 },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'user-create',component:UserCreateComponent
  },
  {
    path:'user-list',component:UserListComponent,canActivate:[AuthenticationGuard]
  },
  {
    path:'user-edit/:id',component:UserEditComponent
  },
  { path: 'resetPassword/:id', component:ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
