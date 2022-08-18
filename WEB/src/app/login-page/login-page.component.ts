import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../shared/api.service';
import { StudentModel } from '../student-dashboard/student.model';
import { LoginModel } from './login.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm! : UntypedFormGroup
  loginModel: LoginModel = new LoginModel()
  studentModel: StudentModel = new StudentModel();

  constructor(private formBuilder: UntypedFormBuilder,
    private router: Router, 
    private messageService: ToastrService,
    private apiService: ApiService) { }

    jwtHelperService = new JwtHelperService();

  ngOnInit(): void {
    window.localStorage.clear();
    this.loginForm = this.formBuilder.group({
      email:['',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: ['',Validators.minLength(5)]
    })
  }

  login(){
    this.loginModel.email = this.loginForm.controls['email'].value;
    this.loginModel.password = this.loginForm.controls['password'].value;

    this.apiService.loginStudent(this.loginModel).subscribe(data => {
      debugger
      this.studentModel = data;
     
      if(this.studentModel.token){
        window.localStorage.setItem('token', `${this.studentModel.token}`);
        let tokenExpirationTime = this.jwtHelperService.getTokenExpirationDate(`${this.studentModel.token}`);
        var expirationTime = (this.getDataDiff(new Date(),tokenExpirationTime)).minute * 60000
        window.localStorage.setItem('expireIn',`${expirationTime}`)
          this.router.navigateByUrl('dashboard')
          this.messageService.success('Login Successfully')
          setTimeout(()=>{
            this.logout()
          },expirationTime)
      }else{
        this.messageService.error(`Didn't Match Email and Password`)
      }
    })
  }

  getDataDiff(startDate:Date, endDate:any) {
    var diff = endDate.getTime() - startDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    return { day: days, hour: hours, minute: minutes, second: seconds };
}



  public isAuthenticated(): boolean {
    debugger
    console.log (localStorage['token']);
    const token = localStorage.getItem('token');

    // Check wheter the token is expired and return true or false
    return !this.jwtHelperService.isTokenExpired(`${token}`);
  }


  logout(){
    this.apiService.logout();
  }

}
