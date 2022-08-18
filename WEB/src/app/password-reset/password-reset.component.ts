import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../shared/api.service';
import { StudentModel } from '../student-dashboard/student.model';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  resetForm!: UntypedFormGroup
  studentModel: StudentModel = new StudentModel;
  confirmData: any;

  constructor(private formBuilder: UntypedFormBuilder,
    private apiService: ApiService,
    private router: Router,
    private acitvatedRoute: ActivatedRoute,
    private messageService: ToastrService) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      newPassword:['',Validators.minLength(5)],
      confirmPassword:['',[Validators.minLength(5)]]
    })
  }

  resetPassword(){
    const id = this.acitvatedRoute.snapshot.paramMap.get('id');
    this.studentModel.newPassword = this.resetForm.controls['newPassword'].value;
    this.studentModel.confirmPassword = this.resetForm.controls['confirmPassword'].value;

    if(this.studentModel.newPassword === this.studentModel.confirmPassword){
      this.apiService.resetPassword(id,this.studentModel).subscribe(data =>{
        this.confirmData = data;
        if(this.confirmData._id){
          this.router.navigateByUrl('/login');
          this.messageService.success('Password has been change')
        }else{
          this.messageService.error(this.confirmData.message)
        }
      })
    }else{
      this.messageService.error('Password and Confirm Password is Not matched')
    }

  }

}
