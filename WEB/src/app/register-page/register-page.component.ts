import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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


  constructor(private formBuilder: UntypedFormBuilder, private api: ApiService,
    private messageService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      class: [''],
      address: [''],
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
    this.studentModel.password = this.registrationForm.controls['password'].value;
    this.studentModel.address = this.registrationForm.controls['address'].value;
    this.studentModel.city = this.registrationForm.controls['city'].value;

    try {
      this.api.postStudent(this.studentModel).subscribe(data => {
        console.log(data);
        this.messageService.success('Registered Successfully');
        if (data) {
          this.registrationForm.reset();
          this.router.navigateByUrl('/dashboard')
        }
      });
    } catch (error) {
      this.messageService.error(`Didn't Register`)
    }


  }

}
