import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder , UntypedFormGroup, Validators} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './student.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  formValue!: UntypedFormGroup; 

  studentobj: StudentModel = new StudentModel;

  allstudent: any;

  btnUpdateShow:boolean = false;

  btnSaveShow:boolean = true;
  isNew=false;


  constructor(private formBuilder:UntypedFormBuilder, 
    private api:ApiService, 
    private messageService:ToastrService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:['',Validators.required],
      class:[''],
      email:['',Validators.required],
      address:[''],
      city:[''],
      password:['',Validators.required]
    })
    this.AllStudent();
  }

  AddStudent(){
    this.studentobj.address = this.formValue.value.address;
    this.studentobj.city = this.formValue.value.city;
    this.studentobj.name = this.formValue.value.name;
    this.studentobj.email = this.formValue.value.email;
    this.studentobj.password = this.formValue.value.password;
    this.studentobj.class = this.formValue.value.class;
    this.studentobj.createdDate = new Date();
    this.studentobj.isVisiable = true;
    debugger
    this.api.postStudent(this.studentobj).subscribe(res=>{
      this.messageService.success("Student Added");
      this.AllStudent();
      this.formValue.reset();
    })

  }

  AllStudent(){
    this.api.getStudent().subscribe(res => {
      debugger
      this.allstudent = res;
    })
  }

  EditStudent(data:any){
    if(this.isNew){
      this.toggle();
    }
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['city'].setValue(data.city);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['class'].setValue(data.class);
    this.formValue.controls['password'].setValue(data.password);
    this.studentobj._id = data._id;
    this.UpdateShowBtn();
  }

  UpdateStudent(){
    this.studentobj.address = this.formValue.value.address;
    this.studentobj.city = this.formValue.value.city;
    this.studentobj.name = this.formValue.value.name;
    this.studentobj.email = this.formValue.value.email;
    this.studentobj.password = this.formValue.value.password;
    this.studentobj.class = this.formValue.value.class;
    this.studentobj.updatedDate = new Date();

    this.api.putStudent(this.studentobj,this.studentobj._id).subscribe(res => {
      this.messageService.warning("Student Updated")
      this.AllStudent();
      this.SaveShowBtn();
    })


  }


  DeleteStudent(id:any){
    debugger
    // this.api.deleteStudent(id).subscribe(res => {
    //   this.AllStudent();
    //   this.messageService.error('Deleted')
    // })

    this.studentobj.isVisiable = false;
    debugger
    this.api.putStudent(this.studentobj,id).subscribe(res=>{
      this.AllStudent();
      this.messageService.error('Deleted')
    })

  }

  UpdateShowBtn()
  {
    this.btnUpdateShow = true;
    this.btnSaveShow = false;
  }
  SaveShowBtn()
  {
    this.btnUpdateShow = false;
    this.btnSaveShow = true;
  }

  close(){
    this.formValue.reset();
  }

  toggle(){
    if(this.formValue.value){
      this.formValue.reset();
    }
    this.isNew = !this.isNew;
  }



}
