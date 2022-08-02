import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { StudentModel } from '../student-dashboard/student.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = 'http://localhost:5050/api/students'

  constructor(private _http:HttpClient) { }

  // Post Method For Add Student
  postStudent(student: StudentModel)
  {
   return this._http.post(this.baseURL,student);
  }

    // Get Method For All Student
    getStudent()
    {
      return this._http.get<any>(this.baseURL).pipe(map((res:any)=> {
        return res
      }))
    }

      // Put Method For Update Student
  putStudent(data:any, id:number)
  {
    debugger
    return this._http.put<any>(this.baseURL+'/' + id,data).pipe(map((res:any)=> {
      return res
    }))
  }

  // Delete Method For Update Student
  deleteStudent(id:number)
  {
    return this._http.delete(this.baseURL+'/'+id);
  }
    
}
