import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  ngOnInit(): void {
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
      if(this.studentModel.email){
        this.router.navigateByUrl('dashboard')
        this.messageService.success('Login Successfully')
      }else{
        this.messageService.error(`Didn't Match Email and Password`)
      }
    })
  }

}
