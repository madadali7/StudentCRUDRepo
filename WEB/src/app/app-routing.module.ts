import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';

const routes: Routes = [
  {path:'',component:StudentDashboardComponent},
  {path:'dashboard',component:StudentDashboardComponent},
  {path:'logout',component:LogoutPageComponent},
  {path:'login',component:LoginPageComponent},
  {path:'register',component:RegisterPageComponent},
  {path:'password/reset',component:ConfirmEmailComponent},
  {path:'account/password/reset/:id',component:PasswordResetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
