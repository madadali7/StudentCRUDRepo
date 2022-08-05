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

  constructor(private formBuilder: UntypedFormBuilder,
    private apiService: ApiService,
    private router: Router,
    private acitvatedRoute: ActivatedRoute,
    private messageService: ToastrService) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      newPassword:['',Validators.required],
      confirmPassword:['',[Validators.required]]
    })
  }

//   private passwordMatcher(control: FormControl) {
//     debugger
//     if (
//         this.resetForm &&
//         (control.value !== this.resetForm.controls['newPassword'].value)
//     ) {
//         return { passwordNotMatch: true };
//     }
//     return null;
// }
  
  resetPassword(){
    this.studentModel.newPassword = this.resetForm.controls['newPassword'].value;
    this.studentModel.confirmPassword = this.resetForm.controls['confirmPassword'].value;

    const id = this.acitvatedRoute.snapshot.paramMap.get('id');
    debugger

    this.apiService.resetPassword(id,this.studentModel).subscribe(data =>{
      debugger
      if(data){
        this.router.navigateByUrl('/login');
        this.messageService.success('Password has been change')
      }else{
        this.messageService.error('Password and Confirm Password is Not Match')
      }
    })
  }

}
