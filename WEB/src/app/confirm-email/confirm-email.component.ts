import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../shared/api.service';
import { StudentModel } from '../student-dashboard/student.model';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  emailConfirmForm! : UntypedFormGroup
  studentModel : StudentModel = new StudentModel;

  constructor(private formBuilder: UntypedFormBuilder,
    private router: Router,
    private messageService: ToastrService,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.emailConfirmForm = this.formBuilder.group({
      email:['',Validators.required]
    })
  }

  async confirm(){

    this.studentModel.email = this.emailConfirmForm.controls['email'].value;

    await this.apiService.confirmEmail(this.studentModel).subscribe(data=>{
       debugger
       this.studentModel = data;
      if(this.studentModel.email){
        this.router.navigateByUrl('/account/password/reset/'+this.studentModel._id);
      }else{
        this.messageService.error('Email doesnt existed')
      }
     })
    
      // this.messageService.error('Email doesnt existed');
  }

}
