import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../shared/api.service';
import { StudentModel } from '../student-dashboard/student.model';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registrationForm!: UntypedFormGroup
  studentModel: StudentModel = new StudentModel()
  jwtHelperService = new JwtHelperService();

  constructor(private formBuilder: UntypedFormBuilder, private api: ApiService,
    private messageService: ToastrService,
    private router: Router,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      class: [''],
      address: [''],
      phoneNumber: [''],
      city: [''],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: ['', Validators.minLength(5)]
    })
  }

  createStudent() {

    this.studentModel.name = this.registrationForm.controls['name'].value;
    this.studentModel.class = this.registrationForm.controls['class'].value;
    this.studentModel.email = this.registrationForm.controls['email'].value;
    this.studentModel.phoneNumber = this.registrationForm.controls['phoneNumber'].value;
    this.studentModel.password = this.registrationForm.controls['password'].value;
    this.studentModel.address = this.registrationForm.controls['address'].value;
    this.studentModel.city = this.registrationForm.controls['city'].value;

    this.api.postStudent(this.studentModel).subscribe(data => {
      this.studentModel = data;
      if (this.studentModel.token) {
      window.localStorage.setItem('token', `${this.studentModel.token}`);
      let tokenExpirationTime = this.jwtHelperService.getTokenExpirationDate(`${this.studentModel.token}`);
      var expirationTime = (this.getDataDiff(new Date(),tokenExpirationTime)).minute * 60000
      window.localStorage.setItem('expireIn',`${expirationTime}`)
        this.messageService.success('Registered Successfully');
        this.registrationForm.reset();
        this.router.navigateByUrl('/dashboard');
        setTimeout(()=>{
          this.logout()
        },expirationTime)
      } else {
        this.messageService.error('Email already Existed')
      }
    });


  }

  getDataDiff(startDate:Date, endDate:any) {
    var diff = endDate.getTime() - startDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    return { day: days, hour: hours, minute: minutes, second: seconds };
}

logout(){
  this.apiService.logout();
}

}
